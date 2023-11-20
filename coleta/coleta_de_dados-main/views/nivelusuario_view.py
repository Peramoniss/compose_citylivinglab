
from flask import Blueprint,redirect, session, url_for, render_template, request
from db.connection_factory import connection_factory
from db.connections_template import connections_template
from flask_login import login_required
from .decorators import requires_access_level


from sqlalchemy.orm import sessionmaker
from models.nivel_usuario import nivel_usuario

from .forms.nivelusuario import NivelUsuarioForm


nivelusuario_routes = Blueprint("nivelusuario_routes", __name__)


@nivelusuario_routes.route('/nivel', methods=['GET', 'POST'])
@login_required
def nivelusuario():
    
    form = NivelUsuarioForm()
    if form.validate_on_submit():
        valida_form_nivelusuario(form)
        
    return render_template('nivel_usuario.html', title='Nível Usuário', form=form)


@nivelusuario_routes.route('/nivel/<int:id_nivel_usuario>', methods=['GET', 'POST'])
@login_required
def nivelusuario_query(id_nivel_usuario):
    
    session = connections_template.get_session()
    
    if id_nivel_usuario != None:
        nivel_usuario_query = session.query(nivel_usuario).filter(nivel_usuario.id==id_nivel_usuario).first()
        form = NivelUsuarioForm(obj=nivel_usuario_query)
        session.close()
    
    if form.validate_on_submit():
        valida_form_nivelusuario(form)
    
    return render_template('nivel_usuario.html', title='Nível Usuário', form=form)


def valida_form_nivelusuario(form):
    
    session = connections_template.get_session()
    nivel_usuario_query = session.query(nivel_usuario).filter(nivel_usuario.id==form.id.data).with_for_update().first()
    
    if nivel_usuario_query is None:
        form_nivel_usuario = form.nivel.data
        new_nivel_usuario = nivel_usuario(nivel = form_nivel_usuario)
        session.add(new_nivel_usuario)
        session.commit()
        session.close()
        return redirect(url_for('main_routes.login'))
    else:
        nivel_usuario_query.nivel = form.nivel.data
        
        session.commit()
        session.close()
        return redirect(url_for('main_routes.index'))



@nivelusuario_routes.route('/niveis', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador'])
def niveisusuarios():
    
    
    session = connections_template.get_session()
    
    
    niveis = session.query(nivel_usuario).all()
        
    
    json_tarefa_filtered = [nivel.dict_format() for nivel in niveis]


    session.close()
    return render_template('niveis_tabela.html', title='Níveis Usuários', niveisusuario=json_tarefa_filtered)


@nivelusuario_routes.route('/nivel/<int:id_nivel_usuario>/delete/', methods=['POST', 'GET', 'DELETE'])
@login_required
def nivelusuario_objeto_delete(id_nivel_usuario):


    session = connections_template.get_session()


    
    objeto = session.query(nivel_usuario).filter(nivel_usuario.id==id_nivel_usuario).one()

    if objeto is not None:
        
        session.commit()
        session.delete(objeto)
        session.commit()

    session.close()
    return redirect(url_for('nivelusuario_routes.niveis'))
