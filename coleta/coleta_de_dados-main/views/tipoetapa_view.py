from flask import Blueprint,request, redirect, url_for, render_template, request
from flask_login import login_required

from db.connection_factory import connection_factory
from sqlalchemy.orm import sessionmaker
from db.connections_template import connections_template

from models.tipo_etapa import tipo_etapa

from .forms.tipoetapa import TipoEtapaForm

from views.decorators import requires_access_level

tipoetapa_routes = Blueprint("tipoetapa_routes", __name__)

@tipoetapa_routes.route('/tipoetapa', methods=['GET', 'POST'])
@login_required
def tipoetapa():
    form = TipoEtapaForm()
    if form.validate_on_submit():
        valida_form_tipoetapa(form) 
    return render_template('tipo_etapa.html', title='Tipo Etapa', form=form)

@tipoetapa_routes.route('/tipoetapa/<int:id_tipoetapa>', methods=['GET', 'POST'])
@login_required
def tipoetapa_query(id_tipoetapa:int):
    
    
    
    if id_tipoetapa != None:
        session = connections_template.get_session()
        tipo_etapa_query = session.query(tipo_etapa).filter(tipo_etapa.id==id_tipoetapa).first()
        session.close()
        form = TipoEtapaForm(obj=tipo_etapa_query)
    
    if form.validate_on_submit():
        valida_form_tipoetapa(form)    

    return render_template('tipo_etapa.html', title='Tipo Etapa', form=form)

def valida_form_tipoetapa(form):
    session = connections_template.get_session()
    tipo_etapa_query = session.query(tipo_etapa).filter(tipo_etapa.id==form.id.data).with_for_update().first()
    if tipo_etapa_query is None:
        new_tipo_etapa = tipo_etapa(nome=form.nome.data)
        session.add(new_tipo_etapa)
        session.commit()
        session.close()
        return redirect(url_for('main_routes.login'))
    else:
        tipo_etapa_query.nome = form.nome.data
        
        tipo_etapa_query.endereco = form.endereco.data
        session.commit()
        session.close()
        return redirect(url_for('main_routes.index'))


@tipoetapa_routes.route('/tiposetapas', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador'])
def tiposetapas():
    
    
    session = connections_template.get_session()
    
    
    tiposetapas = session.query(tipo_etapa).all()
        
    json_tiposetapas_filtered = [tipoetapa.dict_format() for tipoetapa in tiposetapas]
    

    session.close()
    return render_template('tiposetapas_tabela.html', title='Tipos de Tipoes de Etapas', tiposetapas=json_tiposetapas_filtered)


@tipoetapa_routes.route('/tipoetapa/<int:id_tipoetapa>/delete/', methods=['POST', 'GET', 'DELETE'])
@login_required
def tipoetapa_objeto_delete(id_tipoetapa):


    session = connections_template.get_session()


    
    objeto = session.query(tipo_etapa).filter(tipo_etapa.id==id_tipoetapa).one()

    if objeto is not None:
        
        session.commit()
        session.delete(objeto)
        session.commit()

    session.close()
    return redirect(url_for('tipoetapa_routes.tiposetapas'))
