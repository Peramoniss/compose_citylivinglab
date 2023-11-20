from flask import Blueprint,request
from db.connections_template import connections_template
from models.tarefa import tarefa
from crawler.webscraper import Webscraper

webscraping_route = Blueprint("webscraping_route", __name__)

# !TODO: Need to add a decorator with API KEY recognition to log in
# https://blog.teclado.com/api-key-authentication-with-flask/
@webscraping_route.route('/webscraping', methods=['GET'])
def webscrape():

    tarefa_request = request.args.get('id_tarefa', None)
    
    if tarefa_request != None:
        
        session = connections_template.get_session()
        
        tarefa_query = session.query(tarefa).filter(tarefa.id == tarefa_request).first()

        if tarefa_query is not None:
            scp = Webscraper()
            scp.executar_etapas_tarefa(tarefa_request)
            return "Executando tarefa {}".format(tarefa_request)
        
        return "Tarefa {} não encontrada".format(tarefa_request)
    
    return "ID Tarefa não enviado via request" 