

from models.usuario import usuario



from flask_login import LoginManager
from flask import Flask


from mediators import webscraper_mediator

import configparser

from db.connections_template import connections_template


from views import etapa_view, nivelusuario_view, tipoetapa_view, usuario_view, tarefa_view, fontes_view, tipoacao_view, main_routes











if __name__ == "__main__":
    config = configparser.ConfigParser()
    config.read('app.ini')
    app = Flask(__name__,
                static_folder='static')
    app.secret_key = b'klasd21879*&(#'
    app.debug = True
    # app.config['TESTING'] = False
    login = LoginManager(app)


    

    app.register_blueprint(usuario_view.usuario_routes)
    app.register_blueprint(tarefa_view.tarefa_routes)
    app.register_blueprint(fontes_view.fontes_routes)
    app.register_blueprint(tipoetapa_view.tipoetapa_routes)
    app.register_blueprint(tipoacao_view.tipoacao_routes)
    app.register_blueprint(etapa_view.etapa_routes)
    app.register_blueprint(webscraper_mediator.webscraping_route)
    app.register_blueprint(nivelusuario_view.nivelusuario_routes)
    
    app.register_blueprint(main_routes)
    
    login.login_view = 'main_routes.login'

    @login.user_loader
    def load_user(id):
        # NEED TO VALIDATE ID
        
        session = connections_template.get_session()
        login_user = session.query(usuario).filter(usuario.id==id).first()
        session.close()
        return login_user




    app.run(host= config['MAIN_FLASK_APP']['host'], port = config['MAIN_FLASK_APP']['port'])

