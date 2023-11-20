from sqlalchemy import Column, ForeignKey, Integer
from models.base import Base

class etapas_tarefas(Base):
    __tablename__ = 'etapas_tarefas'

    id = Column(Integer, primary_key=True)
    id_tarefa = Column(Integer)
    id_etapa = Column(Integer)
    posicao_etapa_tarefa = Column(Integer)

    def __repr__(self):
        return "<etapas_tarefas(id_tarefa='{}',id_etapa='{}',posicao_etapa_tarefa='{}')>".format(self.id_tarefa,self.id_etapa, self.posicao_etapa_tarefa)