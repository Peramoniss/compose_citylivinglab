from flask import Blueprint,request, redirect, url_for, render_template, request,flash
from flask_login import current_user, login_user, login_required, logout_user
from db.connections_template import connections_template

from models.usuario import usuario
from .forms.login import LoginForm

main_routes = Blueprint("main_routes", __name__)

@main_routes.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html', title='Coleta de Dados - Plataforma Cidades do Conhecimento')

@main_routes.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        # logout_user()
        return redirect(url_for('main_routes.index'))
    form = LoginForm()
    if form.validate_on_submit():
        session = connections_template.get_session()
        user = session.query(usuario).filter(usuario.email==form.email.data).first()
        session.close()
        if user is None:
            flash('Invalid email or password')
            return redirect(url_for('main_routes.login'))
        else:
            login_user(user)
            return redirect(url_for('main_routes.index'))
    return render_template('login.html', title='Sign In', form=form)

@main_routes.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('main_routes.index'))
