
from flask import Blueprint,redirect, session, url_for, render_template, request
from flask_login import login_required
from db.connection_factory import connection_factory


from sqlalchemy.orm import sessionmaker
from models.fonte import fonte

from .forms.fonte import FonteForm

from db.connections_template import connections_template

from views.decorators import requires_access_level

fontes_routes = Blueprint("fontes_routes", __name__)

@fontes_routes.route('/fonte', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level='administrador')
def fonte_objeto():
    form = FonteForm()
    if form.validate_on_submit():
        valida_form_fontes(form)
    
    return render_template('fontes.html', title='Fontes', form=form)

@fontes_routes.route('/fonte/<int:id_fonte>', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level='administrador')
def fonte_objeto_id(id_fonte:int):
    

    if id_fonte != None:
        session = connections_template.get_session()
        fonte_query = session.query(fonte).filter(fonte.id==id_fonte).first()
        form = FonteForm(obj=fonte_query)
        session.close()
    
    if form.validate_on_submit():
        valida_form_fontes(form)
    
    return render_template('fontes.html', title='Fontes', form=form)



def valida_form_fontes(form):

    session = connections_template.get_session()
    fonte_query = session.query(fonte).filter(fonte.id==form.id.data).with_for_update().first()
    if fonte_query is None:
        form_fonte = form.nome.data
        form_endereco = form.endereco.data
        new_fonte = fonte(nome=form_fonte, endereco=form_endereco)
        session.add(new_fonte)
        session.commit()
        session.close()
        return redirect(url_for('main_routes.index'))
    else:
        fonte_query.nome = form.nome.data
        
        fonte_query.endereco = form.endereco.data
        session.commit()
        session.close()
        return redirect(url_for('main_routes.index'))

@fontes_routes.route('/fontes', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador'])
def fontes():
    
    
    session = connections_template.get_session()
    
    
    fontes_objeto = session.query(fonte).all()
        
    json_fontes_filtered = [fonte_objeto.dict_format() for fonte_objeto in fontes_objeto]
    

    session.close()
    return render_template('fontes_tabela.html', title='Fontes', fontes=json_fontes_filtered)


@fontes_routes.route('/fonte/<int:id_fonte>/delete/', methods=['POST', 'GET', 'DELETE'])
@login_required
def tipoetapa_objeto_delete(id_fonte):


    session = connections_template.get_session()


    
    objeto = session.query(fonte).filter(fonte.id==id_fonte).one()

    if objeto is not None:
        
        session.delete(objeto)
        session.commit()

    session.close()
    return redirect(url_for('tipoetapa_routes.fontes'))
