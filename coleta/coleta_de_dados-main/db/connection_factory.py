import configparser
from sqlalchemy import create_engine

class connection_factory():
 
    def __init__(self):
        self.__MYSQL = 1
        self.__erroCon = None
        self.__factory = None
    
    
    def get_connection(self, db):
 
    
        con = None
        config = configparser.ConfigParser()
    
        if (db == self.__MYSQL):

            # Path for reading needs to be relative or else it wont work
            config.read('db/creds.ini')
            connection_line = "mysql+mysqldb://{}:{}@{}:{}/{}".format(config['MYSQL']['user'],config['MYSQL']['password'],config['MYSQL']['host'],config['MYSQL']['port'],config['MYSQL']['dbname'])
            
            try:
                
                con = create_engine(connection_line)
                
            except Exception as e:
                self.__connection_errors = str(e)
 
            return con
 
    def get_errors(self):
        return self.__connection_errors
 