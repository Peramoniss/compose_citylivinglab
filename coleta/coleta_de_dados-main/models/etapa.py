from models.base import Base
from sqlalchemy import Column, Integer, String
from models.base import Base

class etapa(Base):
    __tablename__ = 'etapa'

    id = Column(Integer, primary_key=True)
    id_tipo_etapa = Column(Integer)
    id_tipo_acao = Column(Integer)
    etapa = Column(String)

    def __repr__(self):
        return "<Etapa(id='{}',tipo_etapa='{}',tipo_acao='{}',etapa='{}')>".format(self.id,self.id_tipo_etapa, self.id_tipo_acao, self.etapa)