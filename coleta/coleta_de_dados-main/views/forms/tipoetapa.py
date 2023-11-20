from flask_wtf import FlaskForm
from wtforms import StringField,HiddenField
from wtforms.validators import DataRequired

# ---- Tipo Etapa

class TipoEtapaForm(FlaskForm):

    id = HiddenField('id')
    nome = StringField('nome',validators=[DataRequired()])
