
from flask_wtf import FlaskForm
from wtforms import StringField,  SubmitField, HiddenField
from wtforms.validators import DataRequired

# ---- nivel_usuario

class NivelUsuarioForm(FlaskForm):

    id = HiddenField('id')
    
    nivel = StringField('nivel',validators=[DataRequired()])
    submit = SubmitField('Submit')