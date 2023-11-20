# Integração CityLivingLab

Este projeto combina duas ferramentas: uma de coleta de dados e outra de integração de dados para a plataforma CityLivingLabs da Universidade de Caxias do Sul.

## Requisitos

Para rodar este projeto, você precisará ter o Docker instalado no seu sistema.

- [Instalação do Docker](https://www.docker.com/)

## Como Rodar

Siga os passos abaixo para executar o projeto localmente:

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/hrodrigues1/compose-citylivinglabs.git

2. **Navegue até o diretório do projeto:** 

    cd compose-citylivinglabs

3. **Execute o comando Docker Compose:** 

   ```bash
   docker-compose up -d

Isso iniciará os contêineres Docker. Você pode acessar as ferramentas em:

Ferramenta de Coleta de Dados: http://localhost:5001
Ferramenta de Integração de Dados: http://localhost:4200

**Credenciais Padrão**

Por padrão, foram criados os seguintes usuários:

Ferramenta de Coleta de Dados:

E-mail: root@example.com
Senha: root

Feito por Henrique Rodrigues

