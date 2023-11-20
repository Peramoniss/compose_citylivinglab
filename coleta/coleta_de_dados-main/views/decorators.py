from functools import wraps

from flask_login import current_user,logout_user
from flask import redirect, url_for
from db.connections_template import connections_template
from models.nivel_usuario import nivel_usuario
from models.usuario import usuario


def requires_access_level(access_level):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            
            
            if not current_user.is_authenticated:
                #!TODO: ADD SOME PROPER REDIRECTION MESSAGES
                return redirect(url_for('main_routes.login'))
            else:
                session = connections_template.get_session()
                user = session.query(usuario).filter(usuario.id==current_user.id).first()
                
                if(user is not None):
                    nivel = session.query(nivel_usuario).filter(nivel_usuario.id==user.nivel).first()
                    
                    if nivel.nivel not in access_level:
                        return redirect(url_for('main_routes.index')) #!TODO: Alterar para UNAUTHORIZED ACCESS - https://flask-login.readthedocs.io/en/latest/#flask_login.LoginManager.unauthorized_handler
                else:
                    return redirect(url_for('main_routes.index'))
            # if not session.get('email'):
            #     return redirect(url_for('users.login'))

            # user = User.find_by_email(session['email'])
            # elif not user.allowed(access_level):
            #     return redirect(url_for('users.profile', message="You do not have access to that page. Sorry!"))
            return f(*args, **kwargs)
        return decorated_function
    return decorator