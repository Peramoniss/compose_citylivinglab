# imagem mysql oficial
FROM mysql:5.7

# Defina variáveis de ambiente para a configuração do MySQL
ENV MYSQL_ROOT_PASSWORD=ucs
ENV MYSQL_DATABASE1=capitalsystem
ENV MYSQL_DATABASE2=data_collection_knowledge_cities
ENV MYSQL_DATABASE3=kbd2

# Copia os scripts SQL para o diretório de inicialização do MySQL no contêiner
COPY ./scripts/ /docker-entrypoint-initdb.d/