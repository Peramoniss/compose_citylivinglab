from flask import Blueprint,request, redirect, url_for, render_template, request
from flask_login import login_required


from db.connection_factory import connection_factory
from sqlalchemy.orm import sessionmaker

from models.tipo_acao import tipo_acao
from .forms.tipoacao import TipoAcaoForm

from views.decorators import requires_access_level

from db.connections_template import connections_template


tipoacao_routes = Blueprint("tipoacao_routes", __name__)

@tipoacao_routes.route('/tipoacao', methods=['GET', 'POST'])
@login_required
def tipoacao():
    form = TipoAcaoForm()
    if form.validate_on_submit():
        url_redirect = valida_form_tipoacao(form)
        return redirect(url_for(url_redirect))
    
    return render_template('tipo_acao.html', title='Tipo Etapa', form=form)   


@tipoacao_routes.route('/tipoacao/<int:id_tipoacao>', methods=['GET', 'POST'])
@login_required
def tipoacao_query(id_tipoacao:int):

    
    
    if id_tipoacao != None:
        session = connections_template.get_session()
        tipo_acao_query = session.query(tipo_acao).filter(tipo_acao.id==id_tipoacao).first()
        session.close()
        form = TipoAcaoForm(obj=tipo_acao_query)
    
        
    if form.validate_on_submit():
        valida_form_tipoacao(form)
        
    return render_template('tipo_acao.html', title='Tipo Ação', form=form)        

def valida_form_tipoacao(form):
    session = connections_template.get_session()
    tipo_acao_query = None
    if(form.id.data is not None):
        print("query")
        tipo_acao_query = session.query(tipo_acao).filter(tipo_acao.id==form.id.data).with_for_update().first()
    
    if tipo_acao_query is None:
        print("none")
        new_tipo_acao = tipo_acao(nome=form.nome.data)
        session.add(new_tipo_acao)
        session.commit()
        session.close()
    else:
        print("yess")
        tipo_acao_query.nome = form.nome.data
        
        tipo_acao_query.endereco = form.endereco.data
        session.commit()
        session.close()
    return 'tipoacao_routes.tiposacoes'

@tipoacao_routes.route('/tiposacoes', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador'])
def tiposacoes():
    
    
    session = connections_template.get_session()
    
    
    tiposacoes = session.query(tipo_acao).all()
        
    json_tiposacoes_filtered = [tipoacao.dict_format() for tipoacao in tiposacoes]
    

    session.close()
    return render_template('tiposacoes_tabela.html', title='Tipos de Tipoes de Etapas', tiposacoes=json_tiposacoes_filtered)


@tipoacao_routes.route('/tipoacao/<int:id_tipoacao>/delete/', methods=['POST', 'GET', 'DELETE'])
@login_required
def tipoacao_objeto_delete(id_tipoacao):


    session = connections_template.get_session()


    
    objeto = session.query(tipo_acao).filter(tipo_acao.id==id_tipoacao).one()

    if objeto is not None:
        
        session.commit()
        session.delete(objeto)
        session.commit()

    session.close()
    return redirect(url_for('tipoacao_routes.tiposacoes'))
