import db_config
import logging
# Inicializar o logger
logging.basicConfig(filename='error.log', level=logging.ERROR)
#----------------------------------------------------------
def getFileBaseIntegration():
    try:
        mydb = db_config.connectionMySql(1)
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM filebase WHERE integration = 'A'")
        result = cursor.fetchall()
        cursor.close()
        mydb.close()
        return result
    except Exception as e:
        error_msg = f"Erro na função getFileBaseIntegration(): {str(e)}"
        print(error_msg)  # Para exibir no console
        logging.exception(error_msg)  # Para registrar no arquivo de log

#----------------------------------------------------------
def getIndicatorsFieldByFileBase(code_filebase):
  mydb = db_config.connectionMySql(1)
  cursor = mydb.cursor()
  sql = "SELECT * FROM indicators_field WHERE code_filebase = %s"
  data = (code_filebase,)
  cursor.execute(sql,data)
  result = cursor.fetchall()
  cursor.close()
  mydb.close()
  return result

#----------------------------------------------------------
def getCalculationFieldByIndicatorsField(code_indicators_field):
  mydb = db_config.connectionMySql(1)
  cursor = mydb.cursor()
  sql = "SELECT * FROM calculation_field WHERE code_indicators_field = %s"
  data = (code_indicators_field,)
  cursor.execute(sql,data)
  result = cursor.fetchall()
  cursor.close()
  mydb.close()
  return result

#----------------------------------------------------------
def getFiltersIndicators(cd_indicators_field):
  mydb = db_config.connectionMySql(1)
  cursor = mydb.cursor()
  sql = "SELECT * FROM filters WHERE code_indicators_field = %s"
  data = (cd_indicators_field,)
  cursor.execute(sql,data)
  result = cursor.fetchall()
  cursor.close()
  mydb.close()
  return result

#----------------------------------------------------------
def setStatusDone(code,now):
  mydb = db_config.connectionMySql(1)
  cursor = mydb.cursor()
  sql = "UPDATE filebase SET integration = %s, date_integration = %s WHERE code = %s"
  data = ('C',now,code)
  cursor.execute(sql, data)
  mydb.commit()
  cursor.close()
  mydb.close()

#----------------------------------------------------------
def setStatusError(code):
  mydb = db_config.connectionMySql(1)
  cursor = mydb.cursor()
  sql = "UPDATE filebase SET integration = %s WHERE code = %s"
  data = ('E',code)
  cursor.execute(sql, data)
  mydb.commit()
  cursor.close()
  mydb.close()

#----------------------------------------------------------
def setStatusProcess(code):
  mydb = db_config.connectionMySql(1)
  cursor = mydb.cursor()
  sql = "UPDATE filebase SET integration = %s WHERE code = %s"
  data = ('I',code)
  cursor.execute(sql, data)
  mydb.commit()
  cursor.close()
  mydb.close()