from flask import Blueprint,request, redirect, url_for, render_template, request

from db.connection_factory import connection_factory
from sqlalchemy.orm import sessionmaker

from models.tipo_etapa import tipo_etapa
from models.tipo_acao import tipo_acao
from models.etapa import etapa
from .forms.etapa import EtapaForm
from flask_login import login_required

from db.connections_template import connections_template

etapa_routes = Blueprint("etapa_routes", __name__)


# ---- Etapa


@etapa_routes.route('/etapa', methods=['GET', 'POST'])
@login_required
def etapa_objeto():
    id = request.args.get('id', None)
    # print(id)
    
    session = connections_template.get_session()
    
    tipos_acao = session.query(tipo_acao).all()
    tipos_etapa = session.query(tipo_etapa).all()

    # print(tipos_acao)

    if id != None:
        etapa_query = session.query(etapa).filter(etapa.id==id).first()
        
        form = EtapaForm(obj=etapa_query)
    else:
        form = EtapaForm()
        form.id_tipo_acao.choices = [(acao.id, acao.nome) for acao in tipos_acao]
        form.id_tipo_etapa.choices = [(etapa.id, etapa.nome) for etapa in tipos_etapa]

    if form.validate_on_submit():
        
        etapa_query = None
        
        if(form.id.data  != ""):
            etapa_query = session.query(etapa).filter(etapa.id==form.id.data).with_for_update().first()
        
        
        if etapa_query is None:
            new_etapa = etapa(etapa=form.etapa.data,id_tipo_etapa=form.id_tipo_etapa.data,id_tipo_acao=form.id_tipo_acao.data)
#             id_tipo_etapa = SelectField(u'Tipo de Etapa',validators=[DataRequired()], coerce=int)
# id_tipo_acao = SelectField(u'Tipo de Ação',validators=[DataRequired()], coerce=int)
            session.add(new_etapa)
            session.commit()
            session.close()
            return redirect(url_for('main_routes.login'))
        else:
            
            etapa_query.etapa = form.etapa.data
            etapa_query.id_tipo_etapa = form.tipo_etapa.data
            etapa_query.id_tipo_acao = form.tipo_acao.data

            session.commit()
            session.close()
            return redirect(url_for('main_routes.index'))
    session.close()
    return render_template('etapa.html', title='Tipo Etapa', form=form)   

