import configparser
import requests

def executa_tarefa(tarefa_id:int)->None:

    config = configparser.ConfigParser()
    config.read('app.ini')
    endereco_request = 'http://{}:{}/{}?id_tarefa={}'.format(config['MAIN_FLASK_APP']['host'],config['MAIN_FLASK_APP']['port'],config['MAIN_FLASK_APP']['webscraping_endpoint'],tarefa_id)
    res = requests.get(endereco_request)
    
