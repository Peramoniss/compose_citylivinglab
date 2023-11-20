from flask import redirect, session, url_for, render_template, request, Blueprint
from flask_login import login_required,current_user
from db.connection_factory import connection_factory
from db.connections_template import connections_template
from sqlalchemy.orm import sessionmaker
from datetime import date

from mediators.apis_mediator import api_mediator

from models.usuario import usuario
from models.tipo_etapa import tipo_etapa
from models.tipo_acao import tipo_acao
from models.tarefa import tarefa
from models.fonte import fonte
from models.tipo_etapa import tipo_etapa
from models.tipo_acao import tipo_acao
from models.etapa import etapa
from models.etapas_tarefas import etapas_tarefas

from .forms.tarefa import TarefaForm
from .forms.etapa import EtapaForm

from .decorators import requires_access_level

tarefa_routes = Blueprint("tarefa_routes", __name__)


@tarefa_routes.route('/tarefas', methods=['GET', 'POST'])
@requires_access_level(access_level=['administrador','pesquisador','aluno'])
@login_required
def tarefas():
    # print(id)
    
    session = connections_template.get_session()
    

    tarefas_query = session.query(tarefa).all()
    
    json_tarefas_unfiltered = [tarefa_query.dict_format() for tarefa_query in tarefas_query]
    json_tarefas_filtered = []
    for json_tarefa in json_tarefas_unfiltered:
        
        fonte_query = session.query(fonte).filter(fonte.id==json_tarefa["id_fonte"]).first()
        usuario_query = session.query(usuario).filter(usuario.id==json_tarefa["id_quem_criou"]).first()
        json_tarefa_filtered = json_tarefa
        json_tarefa_filtered["fonte"] = fonte_query.endereco
        json_tarefa_filtered["quem_criou"] = usuario_query.nome

        json_tarefas_filtered.append(json_tarefa_filtered)
    # for tarefa_query in tarefas_query:
    #     json_tarefas.append(tarefa_query)
    session.close()
        
    
    return render_template('tarefas_tabela.html', title='Tarefas', tarefas=json_tarefas_filtered)



@tarefa_routes.route('/tarefa/<int:id_tarefa>/delete/', methods=['POST', 'GET', 'DELETE'])
@login_required
@requires_access_level(access_level=['administrador','pesquisador'])
def tarefa_objeto_delete(id_tarefa):


    session = connections_template.get_session()


    
    objeto = session.query(tarefa).filter(tarefa.id==id_tarefa).one()

    if objeto is not None:
        objeto_etapas_tarefas = session.query(etapas_tarefas).filter(etapas_tarefas.id_tarefa==id_tarefa)
        for objeto_etapa_tarefa in objeto_etapas_tarefas:
            session.delete(objeto_etapa_tarefa)
            objeto_etapas = session.query(etapa).filter(etapa.id==objeto_etapa_tarefa.id_etapa).one()
            if objeto_etapas is not None:
                session.delete(objeto_etapas)
        session.commit()
        session.delete(objeto)
        session.commit()
        agendador_api = api_mediator()
        agendador_api.remover_tarefa_agendada(objeto.id)


    session.close()
    return redirect(url_for('tarefa_routes.tarefas'))

@tarefa_routes.route('/tarefa/<int:id_tarefa>/run/', methods=["GET"])
@login_required
@requires_access_level(access_level=['administrador','pesquisador'])
def tarefa_objeto_executar(id_tarefa):


    session = connections_template.get_session()
    print("criou a setion")
    objeto = session.query(tarefa).filter(tarefa.id==id_tarefa).one()

    if objeto is not None:
        agendador_api = api_mediator()
        print("ENTRO EM EXECUTAR TAREFA")
        agendador_api.executar_tarefa_agendada(objeto.id)


    session.close()
    return redirect(url_for('tarefa_routes.tarefas'))


@tarefa_routes.route('/tarefa', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador','pesquisador'])
def tarefa_objeto():

    form = TarefaForm()

    session = connections_template.get_session()


    session.close()


    fontes = session.query(fonte).all()
    tipos_acao = session.query(tipo_acao).all()
    tipos_etapa = session.query(tipo_etapa).all()
    
    lista_tipos_acao = [ (acao.id, acao.nome) for acao in tipos_acao]
    lista_tipos_etapa = [(etapa.id, etapa.nome) for etapa in tipos_etapa]

    
    form.id_fonte.choices = [(objeto_fonte.id, objeto_fonte.nome) for objeto_fonte in fontes]
        
    form.id_tipo_acao.choices = lista_tipos_acao
    form.id_tipo_etapa.choices = lista_tipos_etapa


    if form.validate_on_submit():
        corpo_formulario = dict(request.form)
        valida_form_tarefa(corpo_formulario, form)



    
    return render_template('tarefas-principal.html', title='Tarefa', form=form)    


@tarefa_routes.route('/tarefa/<int:id_tarefa>', methods=['GET', 'POST'])
@login_required
@requires_access_level(access_level=['administrador','pesquisador'])
def tarefa_objeto_query(id_tarefa):

    
    session = connections_template.get_session()
    
    fontes = session.query(fonte).all()
    
    tipos_acao = session.query(tipo_acao).all()
    tipos_etapa = session.query(tipo_etapa).all()
    
    lista_tipos_acao = [ (acao.id, acao.nome) for acao in tipos_acao]
    lista_tipos_etapa = [(etapa.id, etapa.nome) for etapa in tipos_etapa]

    if id_tarefa != None:
        tarefa_query = session.query(tarefa).filter(tarefa.id==id_tarefa).first()
        
        form = TarefaForm(obj=tarefa_query)
        form.id_fonte.choices = [(objeto_fonte.id, objeto_fonte.nome) for objeto_fonte in fontes]
        
        

        etapas_tarefa_objeto = session.query(etapas_tarefas).filter(etapas_tarefas.id_tarefa == tarefa_query.id).order_by(etapas_tarefas.posicao_etapa_tarefa.asc())
        for k,etapa_objeto in enumerate(etapas_tarefa_objeto):
            # print('--')
            # print(etapa_objeto.id_tarefa)
            # print('==')
            etp = session.query(etapa).filter(etapa.id == etapa_objeto.id_etapa).first()
            html_id_tipo_etapa = "id_tipo_etapa_{}".format(etapa_objeto.posicao_etapa_tarefa)
            html_id_tipo_acao = "id_tipo_acao_{}".format(etapa_objeto.posicao_etapa_tarefa)
            html_etapa = "etapa_{}".format(etapa_objeto.posicao_etapa_tarefa)
            html_id_etapa = "id_etapa_{}".format(etapa_objeto.posicao_etapa_tarefa)
            # print("idetp {}".format(etp.id))
            objeto_etapa_form = EtapaForm(id_etapa=etp.id, id_tipo_etapa=etp.id_tipo_etapa, id_tipo_acao=etp.id_tipo_acao, etapa=etp.etapa)
            objeto_etapa_form.id_tipo_acao.choices = lista_tipos_acao
            objeto_etapa_form.id_tipo_etapa.choices = lista_tipos_etapa
            objeto_etapa_form.id_tipo_etapa.id = html_id_tipo_etapa
            objeto_etapa_form.id_tipo_etapa.name = html_id_tipo_etapa
            objeto_etapa_form.id_tipo_acao.id = html_id_tipo_acao
            objeto_etapa_form.id_tipo_acao.name = html_id_tipo_acao
            objeto_etapa_form.etapa.id = html_etapa
            objeto_etapa_form.etapa.name = html_etapa
            objeto_etapa_form.id_etapa.id = html_id_etapa
            objeto_etapa_form.id_etapa.name = html_id_etapa
            form.etapas.append_entry(objeto_etapa_form)
            # ac = session.query(acao).filter(etapa.id == etapa_objeto.id_etapa).first()
        

        # form.id_fonte=tarefa_query.id_fonte
    else:
        form = TarefaForm()
        form.id_fonte.choices = [(objeto_fonte.id, objeto_fonte.nome) for objeto_fonte in fontes]
        
    form.id_tipo_acao.choices = lista_tipos_acao
    form.id_tipo_etapa.choices = lista_tipos_etapa
    
    session.close()


    if form.validate_on_submit():
        corpo_formulario = dict(request.form)
        valida_form_tarefa(corpo_formulario, form)
    
    return render_template('tarefas-principal.html', title='Tarefa', form=form)    


def valida_form_tarefa(corpo_formulario, form):

    session = connections_template.get_session()

    id_tarefa_formulario = corpo_formulario['id']
    nome_formulario = corpo_formulario['nome']
    cron_formulario = corpo_formulario['cron_agendamento']
    destino_formulario = corpo_formulario['destino']
    id_fonte_formulario = corpo_formulario['id_fonte']

    tarefa_query = None

    agendador_api = api_mediator()

    if id_tarefa_formulario != '':
        tarefa_query = session.query(tarefa).filter(tarefa.id==id_tarefa_formulario).with_for_update().first()
        if tarefa_query is not None:
            tarefa_query.nome=nome_formulario
            tarefa_query.destino=destino_formulario
            tarefa_query.id_fonte = id_fonte_formulario
            if tarefa_query.cron_agendamento!=cron_formulario:
                tarefa_query.cron_agendamento=cron_formulario
                
                
                agendador_api.agendar_tarefa(tarefa_query.id,tarefa_query.cron_agendamento)
                
            
            

            session.commit()
            # session.close()
        
    if id_tarefa_formulario == '' or tarefa_query is None:
        new_tarefa = tarefa(nome=nome_formulario,data_criacao=date.today(),cron_agendamento=cron_formulario,destino=destino_formulario, id_fonte = id_fonte_formulario, id_quem_criou=current_user.get_id())
        
        session.add(new_tarefa)
        session.flush()
        session.commit()
        # session.close()
        id_tarefa_formulario = new_tarefa.id
        
        agendador_api.agendar_tarefa(new_tarefa.id,new_tarefa.cron_agendamento)
        
    # Começa aqui pq o formulario de tarefa tem 8 campos antes das etapas reais
    if(len(corpo_formulario.keys())>8):
        # tamanho_total_etapas = len(corpo_formulario) - 8

        # Remove todas etapas_tarefas, pois irá adicionar em nova ordem
        etapas_tarefas_remocao = session.query(etapas_tarefas).filter(etapas_tarefas.id_tarefa==id_tarefa_formulario)
        if etapas_tarefas_remocao != None:
            etapas_tarefas_remocao.delete()
            session.commit()

        key_list = list(corpo_formulario.keys())
        ordem_etapa = 1 # pro campo de ordem no banco
        i=9
        while i < len(corpo_formulario.keys()):

            # pega o indice identificador de grupo de campos de etapa
            indice_ordem=key_list[i].split('_')[-1]
            # break
            indice_formulario_etapa = 'etapa_{}'.format(indice_ordem)
            indice_formulario_id_etapa = 'id_etapa_{}'.format(indice_ordem)
            indice_formulario_id_tipo_acao = 'id_tipo_acao_{}'.format(indice_ordem)
            indice_formulario_id_tipo_etapa = 'id_tipo_etapa_{}'.format(indice_ordem)
            etapa_query = None

            if(indice_formulario_id_etapa in corpo_formulario):
                # contém o campo ID_ETAPA
                i = i + 4
                etapa_query = session.query(etapa).filter(etapa.id==corpo_formulario[indice_formulario_id_etapa]).with_for_update().first()
            
                if etapa_query is None:
                    etapa_query = etapa( 
                                        id_tipo_etapa=corpo_formulario[indice_formulario_id_tipo_etapa], 
                                        id_tipo_acao=corpo_formulario[indice_formulario_id_tipo_acao],
                                        etapa=corpo_formulario[indice_formulario_etapa])
                    session.add(etapa_query)
                    session.commit()
                    session.flush()


                

                # session.close()
                else:
                    etapa_query.nome=form.nome.data
                    etapa_query.cron_agendamento=form.cron_agendamento.data
                    etapa_query.destino=form.destino.data
                    etapa_query.id_fonte = form.id_fonte.data
                    

                    session.commit()
            else:
                # falta o campo ID_ETAPA
                i = i + 3
                etapa_query = etapa( 
                                    id_tipo_etapa=corpo_formulario[indice_formulario_id_tipo_etapa], 
                                    id_tipo_acao=corpo_formulario[indice_formulario_id_tipo_acao],
                                    etapa=corpo_formulario[indice_formulario_etapa])
                session.add(etapa_query)
                session.commit()
                session.flush()
                    # session.close()

            nova_etapa_tarefa = etapas_tarefas(id_tarefa = id_tarefa_formulario, id_etapa=etapa_query.id, posicao_etapa_tarefa=ordem_etapa)
            session.add(nova_etapa_tarefa)
            session.commit()
            session.flush()
            ordem_etapa = ordem_etapa + 1
    session.close()
    return redirect(url_for('tarefa_routes.tarefas'))