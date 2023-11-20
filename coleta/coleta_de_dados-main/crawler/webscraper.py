from selenium.webdriver.firefox.options import Options
from selenium.webdriver.chrome.options import Options as OptionsChromium
from typing import Any

from selenium.webdriver.support.ui import WebDriverWait

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC

from db.connections_template import connections_template


from models.tipo_acao import tipo_acao
from models.tipo_etapa import tipo_etapa
from models.etapa import etapa
from models.tarefa import tarefa
from models.fonte import fonte
from models.etapas_tarefas import etapas_tarefas

from selenium import webdriver

import configparser

import time

import urllib
import zipfile

import pandas as pd
import requests
import json



class Webscraper:
    def __init__(self, headless:bool = False, ) -> None:


        config = configparser.ConfigParser()
        config.read('app.ini')
        self.driver = None
        self.espera = True
        
        if(config['MAIN_FLASK_APP']['webscraper_browser'] == 'firefox'):
            self.driver_type = 1
        if(config['MAIN_FLASK_APP']['webscraper_browser'] == 'chromium'):
            self.driver_type = 2
        
        

        self.session = connections_template.get_session()
        
        # self.etapas = []

    def __locators_test(self, parameter_locator:str) -> bool:
        tipos = self.session.query(tipo_etapa).filter(tipo_etapa.nome == parameter_locator).first()
        
        self.session.close()
        if(tipos!=None):
            return True
        else:
            return False
    
    def __abre_link(self, link:str):
        self.driver.get(link)

    def __find_by(self, parameter_locator, elemento) -> Any:
        if self.__locators_test(parameter_locator):
            elemento_objeto = None
            

            try:
                # Esperar até que o elemento esteja presente na página
                elemento_objeto = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((parameter_locator, elemento))
                )
                return elemento_objeto
            except TimeoutException:
                print(f"Elemento {elemento} não foi encontrado na página.")
                return None
            except NoSuchElementException:
                print(f"Elemento {elemento} não foi encontrado na página.")
                return None
            except Exception as e:
                print(f"Ocorreu um erro ao tentar encontrar o elemento: {e}")
                return None


    def __actions_test(self,  etapa_objeto: etapa) -> tipo_acao:
        tipo_acao_objeto = self.session.query(tipo_acao).filter(tipo_acao.id == etapa_objeto.id_tipo_acao).first()
        
        
        if(tipo_acao_objeto!=None):
            return tipo_acao_objeto
        else:
            return None

    def __instanciar_webdriver(self, tarefa_destino:str, headless:bool=True) -> None:
        if self.driver_type == 1:


            # To prevent download dialog
            profile = webdriver.FirefoxProfile()
            profile.set_preference('browser.download.folderList', 2) # Localização interna customizada
            profile.set_preference('browser.download.manager.showWhenStarting', False) # sem tela de download
            profile.set_preference("browser.download.manager.focusWhenStarting", False)
            profile.set_preference("browser.download.manager.closeWhenDone", True)
            profile.set_preference("browser.download.manager.showAlertOnComplete", False)
            profile.set_preference("browser.helperApps.alwaysAsk.force", False)
            profile.set_preference("browser.download.manager.useWindow", False)
            profile.set_preference('browser.download.dir', tarefa_destino)
            profile.set_preference('browser.helperApps.neverAsk.saveToDisk', 'application/csv, text/csv, text/plain,application/octet-stream doc xls pdf txt')

            options = Options()
            options.headless = headless
            options = webdriver.FirefoxOptions()
            options.add_argument('--headless')
            options.add_argument('--disable-gpu')
            self.driver = webdriver.Firefox(options=options, firefox_profile= profile)
        
        else:
            
            chrome_options = webdriver.ChromeOptions()
            chrome_options.set_headless(headless)
            chrome_preferences = {'download.default_directory': tarefa_destino}
            chrome_options.add_experimental_option('prefs', chrome_preferences)
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")
            chrome_options.add_argument("--start-maximized")
            chrome_options.add_argument("--headless")
            self.driver = webdriver.Chrome(options=chrome_options)

    def executar_etapas_tarefa(self, id_tarefa:int) -> None:

        tarefa_objeto = self.session.query(tarefa).filter(tarefa.id == id_tarefa).one()
        fonte_objeto = self.session.query(fonte).filter(fonte.id == tarefa_objeto.id_fonte).first()
        
        
        self.__instanciar_webdriver(tarefa_objeto.destino)
        self.__abre_link(fonte_objeto.endereco)

        etapas_tarefa_objeto = self.session.query(etapas_tarefas).filter(etapas_tarefas.id_tarefa == tarefa_objeto.id).order_by(etapas_tarefas.posicao_etapa_tarefa.asc())
        for etapa_objeto in etapas_tarefa_objeto:
            etp = self.session.query(etapa).filter(etapa.id == etapa_objeto.id_etapa).first()
            tipo_acao_objeto = self.__actions_test(etp)
            if(tipo_acao_objeto != None):
                # tipo_acao_objeto = session.query(tipo_acao).filter(tipo_acao.id == etapa_objeto.id_tipo_acao).one()
                
                loc = self.session.query(tipo_etapa).filter(tipo_etapa.id == etp.id_tipo_etapa).first()
                
                if(tipo_acao_objeto.nome=='api_converter_csv' and loc.nome == 'URL'):
                    req = requests.get(etp.etapa)
                    json_file = json.loads(req.content)
                    
                    # Verifica se campo inicial é o mesmo do SICONFI
                    if ('items' in json_file):
                        df = pd.json_normalize(json_file['items'])
                    else:
                        df = pd.json_normalize(json_file)

                    destino_csv = '{}/{}.csv'.format(tarefa_objeto.destino, tarefa_objeto.nome)
                    df.to_csv(destino_csv,index=None)
                    
                else:
                    elemento = self.__find_by(loc.nome, etp.etapa)
                    
                    # elemento = self.find_by()
                    if(tipo_acao_objeto.nome=='download'):
                        final_url = elemento.get_attribute('href')
                        extract_dir = tarefa_objeto.destino
                        
                        zip_path, _ = urllib.request.urlretrieve(final_url)
                        
                        with zipfile.ZipFile(zip_path, "r") as f:
                            f.extractall(extract_dir)
                        
                        self.espera = False
                    
                    else:
                        getattr(elemento, tipo_acao_objeto.nome)()
        

        if(self.espera):
            time.sleep(180)
        self.session.close()
            
        self.driver.quit()