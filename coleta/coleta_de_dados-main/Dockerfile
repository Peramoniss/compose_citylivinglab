FROM python:3.7-slim-buster

# Configuração do ambiente
WORKDIR /app
COPY . /app
SHELL ["/bin/bash", "-c"]

# Atualiza e instala dependências
RUN apt-get update && \
    apt-get install -y wget unzip python3-dev default-libmysqlclient-dev gcc

# Instala o Firefox e o GeckoDriver
RUN apt-get install -y firefox-esr
RUN wget -O /tmp/geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz && \
    tar -xzvf /tmp/geckodriver.tar.gz -C /usr/local/bin/ && \
    rm /tmp/geckodriver.tar.gz
RUN chmod +x /usr/local/bin/geckodriver
ENV MOZ_HEADLESS=1
ENV MOZ_DBUS_REMOTE=1
ENV MOZ_REMOTE_SETTINGS_DEVTOOLS=1


# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposição de portas
EXPOSE 5001 5002

# Comando padrão para iniciar o script
CMD ["./start.sh"]
