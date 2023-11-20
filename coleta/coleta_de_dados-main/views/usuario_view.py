from flask import Blueprint,request, redirect, url_for, render_template, request
from flask_login import login_required

from db.connection_factory import connection_factory
from db.connections_template import connections_template

from sqlalchemy.orm import sessionmaker

from views.decorators import requires_access_level
from views.nivelusuario_view import niveisusuarios



from .forms.usuario import UsuarioForm

from models.nivel_usuario import nivel_usuario
from models.usuario import usuario as Usuario


usuario_routes = Blueprint("usuario_routes", __name__)

@usuario_routes.route('/usuario', methods=['GET', 'POST'])
@login_required
def usuario():
    
    form = UsuarioForm()
    session = connections_template.get_session()
    niveisusuarios = session.query(nivel_usuario).all()
    lista_nivelusuario = [(nivelusuario.id, nivelusuario.nivel) for nivelusuario in niveisusuarios]
    form.nivel.choices = lista_nivelusuario

    if form.validate_on_submit():
        valida_usuario(form)
    
    
    return render_template('usuario.html', title='Usuário', form=form)


@usuario_routes.route('/usuario/<int:id_usuario>', methods=['GET', 'POST'])
@login_required
def usuario_query(id_usuario:int):
    
    
    session = connections_template.get_session()
    
    
    if id_usuario != None:
        niveisusuarios = session.query(nivel_usuario).all()
        lista_nivelusuario = [(nivelusuario.id, nivelusuario.nivel) for nivelusuario in niveisusuarios]
        user = session.query(Usuario).filter(Usuario.id==id_usuario).first()
        session.close()
        form = UsuarioForm(obj=user)
        form.nivel.choices = lista_nivelusuario
    
    if form.validate_on_submit():
        valida_usuario(form)
    
    return render_template('usuario.html', title='Usuário', form=form)


def valida_usuario(form):
    session = connections_template.get_session()
    user = session.query(Usuario).filter(Usuario.id==form.id.data).with_for_update().first()
    if user is None:
        
        new_user = Usuario(nome=form.nome.data, senha=form.senha.data, nivel=form.nivel.data, email=form.email.data)
        session.add(new_user)
        session.commit()
        session.close()
        return redirect(url_for('main_routes.login'))
    else:
        
        user.nome = form.nome.data
        
        
        user.senha = form.senha.data
        user.email = form.email.data
        user.nivel = form.nivel.data
        session.commit()
        session.close()
        return redirect(url_for('main_routes.index'))

@usuario_routes.route('/usuarios', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador'])
def usuarios():
    
    
    session = connections_template.get_session()
    
    
    usuarios = session.query(Usuario).all()
        
    json_usuarios_unfiltered = [usuario.dict_format() for usuario in usuarios]
    json_usuarios_filtered = []

    for json_usuario in json_usuarios_unfiltered:
        
        nivel_query = session.query(nivel_usuario).filter(nivel_usuario.id==json_usuario["nivel"]).first()
        
        json_tarefa_filtered = json_usuario
        json_tarefa_filtered["nivel"] = nivel_query.nivel
        

        json_usuarios_filtered.append(json_tarefa_filtered)

    session.close()
    return render_template('usuarios_tabela.html', title='Usuários', usuarios=json_usuarios_filtered)


@usuario_routes.route('/usuario/<int:id_usuario>/delete/', methods=['POST', 'GET', 'DELETE'])
@login_required
def usuario_objeto_delete(id_usuario):


    session = connections_template.get_session()


    
    objeto = session.query(Usuario).filter(Usuario.id==id_usuario).one()

    if objeto is not None:
        
        session.commit()
        session.delete(objeto)
        session.commit()

    session.close()
    return redirect(url_for('usuario_routes.usuarios'))
