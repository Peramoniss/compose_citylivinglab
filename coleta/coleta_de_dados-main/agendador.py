
import logging
import os

from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from flask import Flask

from db.connection_factory import connection_factory
import configparser

from agendador.scheduler import scheduler

class Config():
    """App configuration."""

    # JOBS = [
    #     {
    #         "id": "job1",
    #         "func": "advanced:job1",
    #         "args": (1, 2),
    #         "trigger": "interval",
    #         "seconds": 10,
    #     }
    # ]

    SCHEDULER_JOBSTORES = None
    SERVER_NAME = None

    SCHEDULER_EXECUTORS = {"default": {"type": "threadpool", "max_workers": 20}}

    SCHEDULER_JOB_DEFAULTS = {"coalesce": False, "max_instances": 3}

    SCHEDULER_API_ENABLED = True

    def __init__(self) -> None:
        conn = connection_factory()
        conn_eng = conn.get_connection(1)
        self.SCHEDULER_JOBSTORES = {"default": SQLAlchemyJobStore(engine=conn_eng)}
        config = configparser.ConfigParser()
        config.read('apscheduler.ini')
        self.SERVER_NAME = "{}:{}".format(config["APSCHEDULER_FLASK"]["hostname"], config["APSCHEDULER_FLASK"]["port"])




# mainly from: https://github.com/viniciuschiele/flask-apscheduler/blob/master/examples/application_factory/__init__.py

def create_app():
    """Create a new app instance."""

    def is_debug_mode():
        """Get app debug status."""
        debug = os.environ.get("FLASK_DEBUG")
        if not debug:
            return os.environ.get("FLASK_ENV") == "development"
        return debug.lower() not in ("0", "false", "no")

    def is_werkzeug_reloader_process():
        """Get werkzeug status."""
        return os.environ.get("WERKZEUG_RUN_MAIN") == "true"

    # pylint: disable=W0621
    app = Flask(__name__)
    app_config = Config()
    app.config.from_object(app_config)
    scheduler.init_app(app)

    logging.getLogger("apscheduler").setLevel(logging.INFO)

    # pylint: disable=C0415, W0611
    with app.app_context():

        # pylint: disable=W0611
        if is_debug_mode() and not is_werkzeug_reloader_process():
            pass
        else:
            from agendador import tasks  # noqa: F401
            # !TODO: ADD THE SCHEDULER LOGGING HERE https://viniciuschiele.github.io/flask-apscheduler/rst/logging.html
            scheduler.start()

        from agendador import routes  # noqa: F401

        app.register_blueprint(routes.web_routes)

        return app


app = create_app()

if __name__ == "__main__":
    app.run()