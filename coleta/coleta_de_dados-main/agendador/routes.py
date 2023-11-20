
from flask import Blueprint,request

from .scheduler import scheduler
from .tasks import executa_tarefa
from apscheduler.triggers.cron import CronTrigger
import json

web_routes = Blueprint("web_routes", __name__)

@web_routes.route("/adicionartarefa", methods=['POST'])
def adicionartarefa():

    
    request_data = json.loads(request.get_json())
    
    tarefa_id = str(request_data.get('tarefa_id'))
    cron_request = request_data.get('cron')
    

    # On crontrigger.from_crontab = https://apscheduler.readthedocs.io/en/stable/modules/triggers/cron.html#module-apscheduler.triggers.cron
    # On add_job = https://apscheduler.readthedocs.io/en/stable/modules/schedulers/base.html#apscheduler.schedulers.base.BaseScheduler.add_job
    job = scheduler.add_job(
        tarefa_id,
        executa_tarefa,
        trigger=CronTrigger.from_crontab(cron_request),
        args=[tarefa_id],
        name=tarefa_id,
        replace_existing=True,
    )
    return "{} added!".format(job)