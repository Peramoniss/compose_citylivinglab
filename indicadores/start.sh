#!/bin/bash

# Caminho para o diretório do cliente
CLIENT_DIR="/app/indica/capital-system-client"

# Caminho para o diretório do servidor
SERVER_DIR="/app/indica/capital-system-server"

# Executar npm start no diretório do cliente
echo "Iniciando o cliente..."
cd "$CLIENT_DIR" || exit
npm start &

# Aguardar um pouco para garantir que o cliente foi iniciado
sleep 10

# Executar npm start no diretório do servidor
echo "Iniciando o servidor..."
cd "$SERVER_DIR" || exit
npm start

# Verificação do Python
echo "Verificando a versão do Python..."
python --version
