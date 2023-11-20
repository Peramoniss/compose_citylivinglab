from MySQLdb import Timestamp
from sqlalchemy import TIMESTAMP, Column, Integer, String
from models.base import Base

class log_execucao_tarefa(Base):
    __tablename__ = 'log_execucao_tarefa'

    id = Column(Integer, primary_key=True)
    id_tarefa = Column(Integer)
    quando_executou = Column(TIMESTAMP)
    descricao_erro = Column(String)

    # def __repr__(self):
    #     return "<etapas_tarefas(id_tarefa='{}',id_etapa='{}',posicao_etapa_tarefa='{}')>".format(self.id_tarefa,self.id_etapa, self.posicao_etapa_tarefa)