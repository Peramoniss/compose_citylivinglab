
from db.connection_factory import connection_factory
from sqlalchemy.orm import sessionmaker

class connections_template():

    @classmethod
    def get_session(cls):
        conn = connection_factory()
        conn_mysql = conn.get_connection(1)
        Session = sessionmaker(bind=conn_mysql) 
        return Session()