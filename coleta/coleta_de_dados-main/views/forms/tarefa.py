from flask_wtf import FlaskForm 
from wtforms import StringField, HiddenField, SelectField, FieldList, FormField
from wtforms.validators import DataRequired
from .etapa import EtapaForm

class TarefaForm(FlaskForm):

    id = HiddenField('id')
    nome = StringField('nome',validators=[DataRequired()])
    cron_agendamento = HiddenField('cron_agendamento',validators=[DataRequired()])
    destino = StringField('destino',validators=[DataRequired()])
    id_fonte = SelectField(u'Fonte',validators=[DataRequired()], coerce=int)
    etapas = FieldList(FormField(EtapaForm), min_entries=0)
    id_tipo_etapa = SelectField(u'Tipo de Etapa', coerce=int)
    id_tipo_acao = SelectField(u'Tipo de Ação', coerce=int)
