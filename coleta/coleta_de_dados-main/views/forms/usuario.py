from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField,HiddenField
from wtforms.validators import DataRequired

# ---- users - login

class UsuarioForm(FlaskForm):

    id = HiddenField('id')
    
    nome = StringField('nome',validators=[DataRequired()])
    senha = PasswordField('senha',validators=[DataRequired()])
    nivel = SelectField(u'nivel', coerce=int)
    email = StringField('email',validators=[DataRequired()])
    submit = SubmitField('Submit')