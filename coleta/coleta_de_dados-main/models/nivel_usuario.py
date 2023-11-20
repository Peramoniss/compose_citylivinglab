from sqlalchemy import Column, Integer, String
from models.base import Base

class nivel_usuario(Base):
    __tablename__ = 'nivel_usuario'

    id = Column(Integer, primary_key=True)
    nivel = Column(String)


    def dict_format(self):
        return {
            "id" : self.id,
            "nivel": self.nivel,
        }

    # def __repr__(self):
    #     return "<Tipo Ação(id='{}',nome='{}')>".format(self.id,self.nome)
    