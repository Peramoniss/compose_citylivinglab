from flask_wtf import Form
from wtforms import StringField,HiddenField, SelectField
from wtforms.validators import DataRequired

class EtapaForm(Form):
    
    id_etapa = HiddenField('id_etapa')
    id_tipo_etapa = SelectField(u'Tipo de Etapa', coerce=int)
    id_tipo_acao = SelectField(u'Tipo de Ação', coerce=int)
    etapa = StringField('Etapa',validators=[DataRequired()])
