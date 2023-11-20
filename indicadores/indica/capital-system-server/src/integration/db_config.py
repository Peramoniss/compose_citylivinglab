import mysql.connector # pip install mysql-connector-python
from sqlalchemy import create_engine # pip install SQLAlchemy

HOTS = 'testebanco'
USER = 'root'
PASSWORD = 'ucs'
DATABASE = 'capitalsystem'

HOTS_2 = 'testebanco'
USER_2 = 'root'
PASSWORD_2 = 'ucs'
DATABSE_2 = 'kbd2'

#----------------------------------------------------------
def connectionMySql(db):
  host = ''
  user = ''
  password = ''
  database = ''  
  if(db == 1):
    host = HOTS
    user = USER
    password = PASSWORD
    database = DATABASE
  if(db == 2):
    host = HOTS_2
    user = USER_2
    password = PASSWORD_2
    database = DATABSE_2
  
  dbConn = mysql.connector.connect(
    host= host,
    user= user,
    password=password,
    database=database
  )
  return dbConn

#----------------------------------------------------------
def connectionSqlalchemy():
  engine = create_engine('mysql+mysqlconnector://'+USER+':'+PASSWORD+'@'+HOTS+'/'+DATABSE_2, echo=False)
  return engine