from sqlalchemy import DATETIME, Column, Integer, String
from models.base import Base

class tarefa(Base):
    __tablename__ = 'tarefa'

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    data_criacao = Column(DATETIME)
    cron_agendamento = Column(String)
    destino = Column(String)
    id_fonte = Column(Integer)
    id_quem_criou = Column(Integer)

    def dict_format(self):
        return {
            "id" : self.id,
            "nome": self.nome,
            "data_criacao" : self.data_criacao,
            "cron_agendamento": self.cron_agendamento,
            "destino" : self.destino,
            "id_fonte": self.id_fonte,
            "id_quem_criou" : self.id_quem_criou
        }
    # def __repr__(self):
    #     return "<etapas_tarefas(id_tarefa='{}',id_etapa='{}',posicao_etapa_tarefa='{}')>".format(self.id_tarefa,self.id_etapa, self.posicao_etapa_tarefa)