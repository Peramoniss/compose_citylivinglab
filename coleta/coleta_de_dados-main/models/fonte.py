from sqlalchemy import Column, Integer, String
from models.base import Base

class fonte(Base):
    __tablename__ = 'fonte'

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    endereco = Column(String)


    def dict_format(self):
        return {
            "id" : self.id,
            "nome": self.nome,
            "endereco": self.endereco,
        }


    # def __repr__(self):
    #     return "<etapas_tarefas(id_tarefa='{}',id_etapa='{}',posicao_etapa_tarefa='{}')>".format(self.id_tarefa,self.id_etapa, self.posicao_etapa_tarefa)