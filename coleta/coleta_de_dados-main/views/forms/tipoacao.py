from flask_wtf import FlaskForm
from wtforms import StringField,HiddenField
from wtforms.validators import DataRequired

# ---- Tipo Ação

class TipoAcaoForm(FlaskForm):

    id = HiddenField('id')
    nome = StringField('nome',validators=[DataRequired()])

