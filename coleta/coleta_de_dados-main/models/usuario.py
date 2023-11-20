from sqlalchemy import Column, Integer, String
from models.base import Base
from flask_login import UserMixin

class usuario(UserMixin, Base):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    senha = Column(String)
    nivel = Column(Integer)
    email = Column(String)
    
    def dict_format(self):
        return {
            "id" : self.id,
            "nome": self.nome,
            "email" : self.email,
            "nivel": self.nivel,
        }
    # def __repr__(self):
    #     return "<etapas_tarefas(id_tarefa='{}',id_etapa='{}',posicao_etapa_tarefa='{}')>".format(self.id_tarefa,self.id_etapa, self.posicao_etapa_tarefa)