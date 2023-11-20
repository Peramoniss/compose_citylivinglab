from flask_wtf import FlaskForm
from wtforms import StringField,HiddenField
from wtforms.validators import DataRequired

# ---- Fonte

class FonteForm(FlaskForm):

    id = HiddenField('id')
    nome = StringField('nome',validators=[DataRequired()])
    endereco = StringField('endereco',validators=[DataRequired()])
