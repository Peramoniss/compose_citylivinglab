CREATE TABLE `tipo_etapa` (
  `id` int PRIMARY KEY,
  `nome` varcharacter
);

CREATE TABLE `etapa` (
  `id` int PRIMARY KEY,
  `id_tipo_etapa` int,
  `etapa` varcharacter
);

CREATE TABLE `tarefa` (
  `id` int PRIMARY KEY,
  `nome` varchar(255),
  `data_criacao` datetime,
  `cron_agendamento` varchar(255),
  `destino` varchar(255),
  `id_fonte` int,
  `id_quem_criou` int
);

CREATE TABLE `etapas_tarefas` (
  `id_tarefa` int,
  `id_etapa` int,
  `posicao_etapa_tarefa` int
);

CREATE TABLE `usuario` (
  `id` int PRIMARY KEY,
  `nome` varchar(255),
  `senha` varchar(255),
  `nivel` int,
  `email` varchar(255)
);

CREATE TABLE `nivel_usuario` (
  `id` int PRIMARY KEY,
  `nivel` varchar(255)
);

CREATE TABLE `fonte` (
  `id` int PRIMARY KEY,
  `nome` varchar(255),
  `endereco` varchar(255)
);

CREATE TABLE `log_execucao_tarefa` (
  `id` int PRIMARY KEY,
  `id_tarefa` int,
  `quando_executou` timestamp,
  `descricao_erro` varchar(255)
);

ALTER TABLE `etapa` ADD FOREIGN KEY (`id_tipo_etapa`) REFERENCES `tipo_etapa` (`id`);

ALTER TABLE `tarefa` ADD FOREIGN KEY (`id_fonte`) REFERENCES `fonte` (`id`);

ALTER TABLE `tarefa` ADD FOREIGN KEY (`id_quem_criou`) REFERENCES `usuario` (`id`);

ALTER TABLE `etapas_tarefas` ADD FOREIGN KEY (`id_tarefa`) REFERENCES `tarefa` (`id`);

ALTER TABLE `etapas_tarefas` ADD FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`nivel`) REFERENCES `nivel_usuario` (`id`);

ALTER TABLE `log_execucao_tarefa` ADD FOREIGN KEY (`id_tarefa`) REFERENCES `tarefa` (`id`);
