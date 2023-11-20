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

