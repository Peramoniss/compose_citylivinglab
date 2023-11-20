FROM node:16.20.2

WORKDIR /app

# Instalação do Python e das dependências Python diretamente
RUN apt-get update \
    && apt-get install -y python3 python3-pip \
    && pip3 install --upgrade pip \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3 1 \
    && update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1 \
    && rm -rf /var/lib/apt/lists/*
# Instalação global do Angular CLI
RUN npm install -g @angular/cli@16.2.10

# Copia os arquivos necessários para o contêiner
COPY . .

RUN pip install -r requirements.txt

# Expor as portas necessárias
EXPOSE 4200
EXPOSE 5000

# Comando para iniciar o aplicativo
CMD ["./start.sh"]
