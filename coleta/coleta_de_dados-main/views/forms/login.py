from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, PasswordField, SubmitField


class LoginForm(FlaskForm):

    senha = PasswordField('senha',validators=[DataRequired()])
    email = StringField('email',validators=[DataRequired()])
    submit = SubmitField('Submit')