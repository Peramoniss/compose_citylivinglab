-- If you want to create the database, use the following:
-- create database data_collection_knowledge_cities;

-- If you want to create a user for it (swapping <password> and <user>):
-- create user <user>@localhost IDENTIFIED BY '<password>';

-- To enable all permissions on the data_collection_knowledge_cities DB from above:
-- grant all privileges on data_collection_knowledge_cities.* to '<user>'@localhost
CREATE DATABASE data_collection_knowledge_cities;
USE data_collection_knowledge_cities;

CREATE TABLE `tipo_etapa` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255)
);

CREATE TABLE `tipo_acao` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255)
);

CREATE TABLE `etapa` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_tipo_etapa` int,
  `id_tipo_acao` int,
  `etapa` varchar(255)
);

CREATE TABLE `tarefa` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255),
  `data_criacao` datetime,
  `cron_agendamento` varchar(255),
  `destino` varchar(255),
  `id_fonte` int,
  `id_quem_criou` int
);

CREATE TABLE `etapas_tarefas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_tarefa` int,
  `id_etapa` int,
  `posicao_etapa_tarefa` int
);

CREATE TABLE `usuario` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255),
  `senha` varchar(255),
  `nivel` int,
  `email` varchar(255)
);

CREATE TABLE `nivel_usuario` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nivel` varchar(255)
);

CREATE TABLE `fonte` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255),
  `endereco` varchar(255)
);

CREATE TABLE `log_execucao_tarefa` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_tarefa` int,
  `quando_executou` timestamp,
  `descricao_erro` varchar(255)
);

ALTER TABLE `etapa` ADD FOREIGN KEY (`id_tipo_etapa`) REFERENCES `tipo_etapa` (`id`);

ALTER TABLE `etapa` ADD FOREIGN KEY (`id_tipo_acao`) REFERENCES `tipo_acao` (`id`);

ALTER TABLE `tarefa` ADD FOREIGN KEY (`id_fonte`) REFERENCES `fonte` (`id`);

ALTER TABLE `tarefa` ADD FOREIGN KEY (`id_quem_criou`) REFERENCES `usuario` (`id`);

ALTER TABLE `etapas_tarefas` ADD FOREIGN KEY (`id_tarefa`) REFERENCES `tarefa` (`id`);

ALTER TABLE `etapas_tarefas` ADD FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`nivel`) REFERENCES `nivel_usuario` (`id`);

ALTER TABLE `log_execucao_tarefa` ADD FOREIGN KEY (`id_tarefa`) REFERENCES `tarefa` (`id`);

INSERT INTO 
	tipo_acao(nome)
VALUES
("click"),
("click_and_hold"),
("context_click"),
("double_click"),
("drag_and_drop"),
("drag_and_drop_by_offset"),
("key_down"),
("key_up"),
("move_by_offset"),
("move_to_element"),
("move_to_element_with_offset"),
("pause"),
("perform"),
("release"),
("reset_actions"),
("send_keys"),
("send_keys_to_element");


INSERT INTO 
	tipo_etapa(nome)
VALUES
("id"),
("xpath"),
("link text"),
("partial link text"),
("name"),
("tag name"),
("class name"),
("css selector");

INSERT INTO
	nivel_usuario(id, nivel)
VALUES
	("1","administrador"),
	("2","pesquisador"),
	("3","aluno");

INSERT INTO usuario (nome, senha, nivel, email)
VALUES ('root', 'root', 1, 'root@example.com');