import pandas as pd # pip install pandas
import utils
import db_config
import logger
from datetime import datetime
import chardet #pip install chardet

#create log file 
logger = logger.createLogger()
isError = False

#Read data source characteristics
try:
	dados = utils.getFileBaseIntegration()
	logger.info('Leitura dos Fontes de dados para Processamento')
except:
	logger.error('Erro na leitura dos Fontes de dados para Processamento')

#init integration
if len(dados)> 0:
  for dado in dados:
    isError = False
    v_code = dado[0]
    v_url = dado[2]
    v_period = dado[3]
    v_year = dado[4].year
    v_month = dado[4].month
    v_separator = dado[7]
    v_directory = dado[8]
    v_city_field = dado[9]

    #Set status process
    try:
      utils.setStatusProcess(v_code)
    except Exception as e:
      logger.error('Erro na conexao')
      logger.error(e)
      isError = True
      utils.setStatusError(v_code)
      continue
    
    #Creating connection
    try:
      mydb = db_config.connectionMySql(2)
      logger.info('Criando conexao Integracao')
    except Exception as e:
      logger.error('Erro na conexao')
      logger.error(e)
      isError = True
      utils.setStatusError(v_code)
      continue

    #Clean Staging Area
    try:
      cursor = mydb.cursor()
      cursor.execute("TRUNCATE TABLE tmp_values")
      mydb.commit()
      logger.info('Limpa Banco Staging')
    except:
      logger.error('Erro ao limpar o Banco Staging')
      isError = True
      utils.setStatusError(v_code)
      continue
    finally:
      cursor.close()

    #Read indicator fields
    try:
      indicatorsField = utils.getIndicatorsFieldByFileBase(v_code)
      logger.info('Leitura dos campos de para de cada indicador para Processamento')
    except:
      logger.error('Erro na leitura dos campos de para de cada indicador para Processamento')
      isError = True
      utils.setStatusError(v_code)
      continue

    if len(indicatorsField)> 0:
      for indicatorField in indicatorsField:
        v_code_indicators_field = indicatorField[0]
        v_field_exp = indicatorField[2]
        v_data_type = indicatorField[3]
        v_code_indicator = indicatorField[8]
        v_now = datetime.now()
        v_strNow = v_now.date().isoformat()
        v_string_filter = ""  
        v_array_usecols = []
        v_array_calculation = []
        v_array_remove_filter = []
        v_array_usecols.append(v_city_field)
        calculationFields = []
        if(v_data_type == 'EXP'):
          try:
            calculationFields = utils.getCalculationFieldByIndicatorsField(v_code_indicators_field)
            logger.info('Leitura dos campos usados no calculo de cada indicador.')
          except:
            logger.error('Erro na leitura dos camposusados no calculo de cada indicador.')
            isError = True
            utils.setStatusError(v_code)
            continue
        
        if len(calculationFields)> 0:
          for calculationField in calculationFields:
            v_array_usecols.append(calculationField[2])
            v_array_calculation.append(calculationField[2])
            v_array_remove_filter.append(calculationField[2])
        else:
          v_array_usecols.append(v_field_exp)
        
        #Read filters df
        try:
          filtersIndicators = utils.getFiltersIndicators(v_code_indicators_field)
          logger.info('Leitura dos filtros de cada indicador')
        except:
          logger.error('Erro na leitura dos filtros de cada indicador')
          isError = True
          utils.setStatusError(v_code)
          continue

        if len(filtersIndicators)>0:
          for i, filterIndicator in enumerate(filtersIndicators):
            v_array_usecols.append(filterIndicator[2])
            v_array_remove_filter.append(filterIndicator[2])
            v_string_filter += '`' + filterIndicator[2] + '`'
            v_string_filter += filterIndicator[3]
            v_string_filter += filterIndicator[4]
            if i < len(filtersIndicators)-1:
              v_string_filter += " and "

        #Importing dataset from CSV
        try:
          with open(v_directory, 'rb') as file:
            result = chardet.detect(file.read(100))
            charenc = result['encoding']
          df = pd.read_csv(v_directory,encoding = charenc, delimiter = v_separator ,usecols = v_array_usecols)
          if(v_string_filter!=""):
            df.query(v_string_filter,inplace = True)
        except Exception as e:
          logger.error('Erro na leitura do csv')
          logger.error(e)
          utils.setStatusError(v_code)
          isError = True
          continue

        #Data clean up
        try:
          if(v_data_type == 'EXP'):
            for calculation_field in v_array_calculation:
              df[calculation_field] = df[calculation_field].apply(lambda x: str(x).replace(",","."))
              df[calculation_field] = df[calculation_field].astype('float64')
            df['value']  = pd.eval(v_field_exp)
          else:
            df[v_field_exp] = df[v_field_exp].apply(lambda x: str(x).replace(",","."))
            df[v_field_exp] = df[v_field_exp].astype('float64')
            df.rename(columns={v_field_exp: 'value'}, inplace = True)
          df.rename(columns={v_city_field: 'codeCity'}, inplace = True)
          df['codeIndicator'] = str(v_code_indicator)
          df['year'] = str(v_year)
          df['month'] = str(v_month)
          df['link'] = v_url
          df.drop(v_array_remove_filter, axis=1, inplace=True)
        except Exception as e:
          logger.error('Erro na limpeza dos dados para integração')
          logger.error(e)
          utils.setStatusError(v_code)
          isError = True
          continue
        
        #Verify empty dataframe
        if df.empty:
          logger.error('Data frame vazio, não encontrou dados para integrar')
          utils.setStatusError(v_code)
          isError = True
          continue

       #Create staging area
        try:
          engine = db_config.connectionSqlalchemy()
          df.to_sql('tmp_values' , con=engine ,if_exists='append' , index=False , chunksize=1000)
          logger.info('Carga dos dados para Staging area finalizada')
        except Exception as e:
          logger.error('Erro ao carregar dados para Staging area')
          logger.error("\n %s ",df)
          logger.error(e)
          utils.setStatusError(v_code)
          isError = True
          continue
    
    if(not isError):
      #Copy staging area (tmp_values) to (values)
      try:
        cursor = mydb.cursor()
        sql = "INSERT INTO `values`(codeCity, codeIndicator, year, month, value, link, dateIntegration) SELECT codeCity, codeIndicator, year, month, value, link, %s FROM tmp_values"
        data = (v_now,) 
        cursor.execute(sql,data)
        logger.info('Integração para o banco oficial finalizada')
        utils.setStatusDone(v_code,v_now)
        mydb.commit()
        logger.info('StatusOk')
      except Exception as e:
        logger.error('Erro na copia de dados para o banco oficial') 
        logger.error(e)
        mydb.rollback()
        utils.setStatusError(v_code)
        continue
      finally:
        cursor.close()
        mydb.close()
    else:
      try:
        utils.setStatusError(v_code)
      except Exception as e: 
        logger.error(e)

else:
  isError = True