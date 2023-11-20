from models.base import Base
from sqlalchemy import Column, Integer, String
from models.base import Base

class tipo_etapa(Base):
    __tablename__ = 'tipo_etapa'

    id = Column(Integer, primary_key=True)
    nome = Column(String)

    def dict_format(self):
        return {
            "id" : self.id,
            "nome": self.nome,
        }

    def __repr__(self):
        return "<Tipo Etapa(id='{}',nome='{}')>".format(self.id,self.nome)
    