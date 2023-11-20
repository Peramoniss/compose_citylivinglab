from datetime import datetime
import logging #pip install logging

def createLogger():
  #now = datetime.now()
  #log_file = 'logfile_{0}.log'.format(now.strftime("%Y-%m-%d_%H%M%S"))
  log_file = 'logfile.log'
  logger = logging.getLogger(__name__)
  hdlr = logging.FileHandler("{0}/{1}".format('/app/dados',log_file))
  formatter = logging.Formatter('%(asctime)s;%(name)s;%(levelname)s;%(message)s')
  hdlr.setFormatter(formatter)
  logger.addHandler(hdlr)
  logger.setLevel(logging.INFO)
  return logger