import requests

from models.tarefa import tarefa
import configparser
import json


# https://sourcemaking.com/design_patterns/mediator
class api_mediator():

    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read('apscheduler.ini')
        

    def agendar_tarefa(self,tarefa_id:int, cron:str) -> None:
        
        post_body = json.dumps({'tarefa_id':tarefa_id, 'cron':cron})
        
        endereco_apscheduler_api = "http://{}:{}/{}".format(self.config["APSCHEDULER_FLASK"]["hostname"], self.config["APSCHEDULER_FLASK"]["port"],self.config["APSCHEDULER_FLASK"]["endpointadicionartarefa"])
        res = requests.post(endereco_apscheduler_api, json=post_body)
        
        
    def remover_tarefa_agendada(self,tarefa_id:int) -> None:
        
        endereco_apscheduler_api = "http://{}:{}/{}/{}".format(self.config["APSCHEDULER_FLASK"]["hostname"], self.config["APSCHEDULER_FLASK"]["port"],self.config["APSCHEDULER_FLASK"]["endpointschedulerjobs"],tarefa_id)
        res = requests.delete(endereco_apscheduler_api)
        
    
    def executar_tarefa_agendada(self,tarefa_id:int) -> None:
        
        post_body = json.dumps({'id':tarefa_id})
        
        endereco_apscheduler_api = "http://{}:{}/{}/{}/run".format(self.config["APSCHEDULER_FLASK"]["hostname"], self.config["APSCHEDULER_FLASK"]["port"],self.config["APSCHEDULER_FLASK"]["endpointschedulerjobs"],tarefa_id)
        res = requests.post(endereco_apscheduler_api, json=post_body)
        
        