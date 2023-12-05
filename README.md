
# Integração CityLivingLab

Este projeto combina duas ferramentas: uma de coleta de dados e outra de integração de dados para a plataforma CityLivingLabs da Universidade de Caxias do Sul.

## Requisitos

Para rodar este projeto, você precisará ter o Docker instalado no seu sistema.

- [Instalação do Docker](https://www.docker.com/)

### Usuários do Windows 
Se você estiver utilizando o Windows, será necessário ter o WSL (Windows Subsystem for Linux) instalado. Você pode seguir o guia de instalação disponível [aqui](https://docs.microsoft.com/pt-br/windows/wsl/install).

### Recomendação para Usuários 
Recomenda-se a utilização de um ambiente gráfico, como o [Docker Desktop](https://www.docker.com/products/docker-desktop), para uma experiência mais amigável.

## Como Rodar

Siga os passos abaixo para executar o projeto localmente:

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/hrodrigues1/compose-citylivinglab.git

2. **Navegue até o diretório do projeto:** 

    cd compose-citylivinglab

3. **Execute o comando Docker Compose:** 

   ```bash
   docker-compose up -d

Isso iniciará os contêineres Docker. Você pode acessar as ferramentas em:

Ferramenta de Coleta de Dados: http://localhost:5001
Ferramenta de Integração de Dados: http://localhost:4200

4. **Gerenciando os Contêineres**
Para parar os contêineres, você pode usar o comando:

   ```bash
      docker-compose down

5. **Volume Compartilhado**

O volume compartilhado entre as ferramentas e o host está disponível em `C:/TCC`.

6. **Credenciais Padrão**

Por padrão, foram criados os seguintes usuários:

Ferramenta de Coleta de Dados:

E-mail: root@example.com
Senha: root

**Aviso Importante**

Todos os arquivos necessários para a criação das imagens utilizadas estão disponíveis neste mesmo diretório. Certifique-se de revisar e entender o conteúdo antes de executar o projeto.

Feito por Henrique Rodrigues

