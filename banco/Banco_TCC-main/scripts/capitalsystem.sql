-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 24, 2023 at 03:59 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capitalsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `calculation_field`
--

CREATE DATABASE capitalsystem;
USE capitalsystem;

DROP TABLE IF EXISTS `calculation_field`;
CREATE TABLE IF NOT EXISTS `calculation_field` (
  `code` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_indicators_field` bigint(20) NOT NULL,
  `field` varchar(255) NOT NULL,
  `fieldType` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`code`,`code_indicators_field`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `code` int(11) NOT NULL,
  `name_pt` varchar(255) DEFAULT NULL,
  `description_pt` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description_en` varchar(255) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`code`, `name_pt`, `description_pt`, `name_en`, `description_en`, `type`) VALUES
(1, 'Identidade', 'Inclui os elementos formais e informais de capital que contribuíram e/ou contribuem para determinar a individualidade, clareza e diferenciação de uma cidade.', 'Identity', 'It includes the formative and informative elements of capital that contributed and/or contribute to determine the individuality, clarity and differentiation of a city.', 'System_Capital'),
(2, 'Inteligência', 'Capacidade dos sistemas de sentir, fazer sentido, e responder a agentes externos e eventos que são significativos para o bem-estar da cidade (ou seja, as agências de planejamento estratégico da cidade, futuros centros urbanos públicos e privados, estudos ', 'Intelligence', 'Ability of systems to sense, make sense, and respond to external agents and events that are significant to the city\'s well-being (ie, city strategic planning agencies, future public and private urban centers, studies', 'System_Capital'),
(3, 'Relacional', 'Capacidade de desenvolver interações de qualidade com todos os agentes significativos, tanto internos quanto externos. Qualidade da interação entre os agentes internos significativos da cidade, bem como entre a cidade e seus agentes externos significativo', 'Relational', 'Ability to develop quality interactions with all significant agents, both internal and external. Quality of the interaction between the significant internal agents of the city, as well as between the city and its significant external agents', 'System_Capital'),
(4, 'Humano Individual', 'Capacidade de criar condições para o pleno desenvolvimento biológico e psicológico dos moradores. Capacidade de geração de valor de indivíduos.', 'Individual Human', 'Ability to create conditions for the full biological and psychological development of the residents. Capacity to generate value of individuals.', 'System_Capital'),
(5, 'Humano Coletivo', 'Capacidade de aumentar o potencial de realização do objetivo de suas comunidades constituintes. Capacidades coletivas e de equipe para gerar valor.', 'Collective Human', 'Ability to increase the potential for achieving the goal of their constituent communities. Collective and team capabilities to generate value.', 'System_Capital'),
(6, 'Instrumental Tangível', 'Meios de produção baseados no físico, através dos quais outros capitais elevam a sua capacidade de geração de valor.', 'Material Instrumental', 'Physical-based production means through which other capital raises its value-generating capacity.', 'System_Capital'),
(7, 'Instrumental Intangível', 'Meios de produção baseados no conhecimento através dos quais outros capitais incrementam sua capacidade de geração de valor.', 'Intangible Instrumental', 'Knowledge-based production means through which other capitals increase their capacity for value generation.', 'System_Capital'),
(8, 'Financeiro', 'Capacidade de gerar e manter uma base monetária saudável. Denominação monetária de um conjunto de dimensões de valor.', 'Financial', 'Ability to generate and maintain a healthy monetary base. Monetary denomination of a set of value dimensions.', 'System_Capital');

-- --------------------------------------------------------

--
-- Table structure for table `filebase`
--

DROP TABLE IF EXISTS `filebase`;
CREATE TABLE IF NOT EXISTS `filebase` (
  `code` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `period` varchar(1) NOT NULL,
  `month_year` datetime NOT NULL,
  `file_type` varchar(10) NOT NULL,
  `head` varchar(1) NOT NULL,
  `separator` varchar(1) NOT NULL,
  `directory` varchar(255) NOT NULL,
  `city_field` varchar(100) NOT NULL,
  `integration` varchar(1) NOT NULL,
  `date_integration` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `filebase`
--

INSERT INTO `filebase` (`code`, `name`, `url`, `period`, `month_year`, `file_type`, `head`, `separator`, `directory`, `city_field`, `integration`, `date_integration`, `created_at`, `updated_at`) VALUES
(2, 'siconfi', 'https://siconfi.tesouro.gov.br/siconfi/index.jsf', 'A', '2020-12-01 00:00:00', 'csv', '', ';', 'C:\\import\\finbraRREOTeste.csv', 'Cod.IBGE', 'C', '2022-10-27 01:47:35', '2022-10-26 23:41:00', '2022-10-27 01:47:34'),
(3, 'kfjaskldfjasklçd', 'lakjdflkajsldkfj', 'A', '2021-12-01 00:00:00', 'csv', '', ';', 'jlsdfaljkfdsakljdasljkadfs', 'Cod.IBGE', 'E', NULL, '2023-03-31 17:06:36', '2023-03-31 17:09:53'),
(4, 'teste', 'https://siconfi.tesouro.gov.br/siconfi/index.jsf', 'A', '1996-12-01 00:00:00', 'csv', '', ';', 'C:\\import\\finbraRREOTeste', 'codigo_city', 'P', NULL, '2023-07-10 15:28:50', '2023-07-10 15:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `filters`
--

DROP TABLE IF EXISTS `filters`;
CREATE TABLE IF NOT EXISTS `filters` (
  `code` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_indicators_field` bigint(20) NOT NULL,
  `field_filter` varchar(255) DEFAULT NULL,
  `logical_op` varchar(10) DEFAULT NULL,
  `value_filter` varchar(255) DEFAULT NULL,
  `filter_type` varchar(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`code`,`code_indicators_field`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `filters`
--

INSERT INTO `filters` (`code`, `code_indicators_field`, `field_filter`, `logical_op`, `value_filter`, `filter_type`, `created_at`, `updated_at`) VALUES
(1, 16, 'Coluna', '==', '\"DESPESAS LIQUIDADAS ATÉ O BIMESTRE (d)\"', 'S', '2022-10-27 01:35:05', '2022-10-27 01:35:05'),
(2, 16, 'Conta', '==', '\"Educação de Jovens e Adultos\"', 'S', '2022-10-27 01:35:40', '2022-10-27 01:35:40');

-- --------------------------------------------------------

--
-- Table structure for table `indicators`
--

DROP TABLE IF EXISTS `indicators`;
CREATE TABLE IF NOT EXISTS `indicators` (
  `code` int(11) NOT NULL,
  `name_pt` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) NOT NULL,
  `codeCategory` int(11) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `indicators`
--

INSERT INTO `indicators` (`code`, `name_pt`, `name_en`, `codeCategory`) VALUES
(1, 'Despesas municipais com planejamento e orçamento', '', 2),
(2, 'Densidade de Telefonia Fixa Unidade: Serviço telefônico', '', 2),
(3, 'Densidade de TV por Assinatura', '', 2),
(4, 'Densidade de telefonia móvel', '', 2),
(5, 'Densidade de banda larga fixa', '', 2),
(6, 'Wifi pública', '', 2),
(7, 'Veículos de Imprensa', '', 2),
(8, 'Frota de ônibus para cada cem habitantes', '', 7),
(9, 'Despesas municipais legislativas', '', 7),
(10, 'Despesas municipais com ação legislativa', '', 7),
(11, 'Despesas municipais com administração', '', 7),
(12, 'Despesas municipais com administração financeira', '', 7),
(13, 'Despesas municipais com controle interno', '', 7),
(14, 'Despesas municipais com ensino fundamental', '', 7),
(15, 'Despesas municipais com ensino médio', '', 7),
(16, 'Despesas municipais com ensino superior', '', 7),
(17, 'Número de entidades sem fins lucrativos para cada mil habitantes', '', 7),
(18, 'Despesas municipais com desporto comunitário', '', 3),
(19, 'Despesas municipais com lazer', '', 3),
(20, 'Quantidade de imigrantes que entraram no ano a cada dez mil habitantes', '', 3),
(21, 'Mortes por causas externas (acidentes e violências) a cada dez mil habitantes', '', 3),
(22, 'Número de divórcios concedidos', '', 3),
(23, 'Mulheres em assentos parlamentares como vereadoras', '', 3),
(24, 'IFDM emprego e renda', '', 8),
(25, 'Despesas municipais com comércio e serviços', '', 8),
(26, 'Produto Interno Bruto per capita a preços correntes', '', 8),
(27, 'Grau de formalização dos ocupados', '', 8),
(28, 'Percentual da população com renda acima de 3 SM', '', 8),
(29, 'Poupança média por habitante', '', 8),
(30, 'IFDM educação', '', 5),
(31, 'Despesas municipais com saúde', '', 5),
(32, 'Despesas municipais com assistência comunitária', '', 5),
(33, 'Despesas municipais com habitação', '', 5),
(34, 'Despesas municipais com saneamento rural e urbano', '', 5),
(35, 'Mortes por doenças de alto impacto a cada 100 mortes', '', 5),
(36, 'Óbitos por causas evitáveis em menores de 5 anos', '', 5),
(37, 'Óbitos por causas evitáveis de 5 a 74 anos', '', 5),
(38, 'Imunizações BCG', '', 5),
(39, 'IFDM saúde', '', 4),
(40, 'Despesas municipais com assistência à criança e ao adolescente', '', 4),
(41, 'Despesas municipais com educação de jovens e adultos', '', 4),
(42, 'Despesas municipais com educação especial', '', 4),
(43, 'Mortalidade infantil', '', 4),
(44, 'Percentual de mortes em acidentes de trânsito com relação ao total de mortes', '', 4),
(45, 'IDEB Rede pública municipal anos iniciais', '', 4),
(46, 'IFDM', '', 1),
(47, 'Despesas municipais com cultura', '', 1),
(48, 'Vínculos ativos', '', 1),
(49, 'Proporção de trabalhadores formais para cada cem habitantes', '', 1),
(50, 'Importação', '', 1),
(51, 'Exportação', '', 1),
(52, 'Saldo de empregos por cem vínculos ativos', '', 1),
(53, 'Despesas municipais com segurança pública', '', 6),
(54, 'Despesas municipais  com gestão ambiental', '', 6),
(55, 'Despesas municipais com transporte', '', 6),
(56, 'Índice de atendimento total de esgoto referido aos municípios atendidos com água', '', 6),
(57, 'Índice de atendimento total de água', '', 6),
(58, 'Índice de coleta de população atendida no município por coleta de resíduos', '', 6),
(59, 'Número de leitos hospitalares para cada mil habitantes', '', 6);

-- --------------------------------------------------------

--
-- Table structure for table `indicators_field`
--

DROP TABLE IF EXISTS `indicators_field`;
CREATE TABLE IF NOT EXISTS `indicators_field` (
  `code` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code_filebase` bigint(20) NOT NULL,
  `field` varchar(255) NOT NULL,
  `data_type` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `data_size` varchar(25) NOT NULL,
  `start_pos` int(11) NOT NULL,
  `end_pos` int(11) NOT NULL,
  `code_indicator` int(11) NOT NULL,
  `exp_calculation` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`code`,`code_filebase`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `indicators_field`
--

INSERT INTO `indicators_field` (`code`, `code_filebase`, `field`, `data_type`, `description`, `data_size`, `start_pos`, `end_pos`, `code_indicator`, `exp_calculation`, `created_at`, `updated_at`) VALUES
(16, 2, 'Valor', 'N', 'Despesas educação de jovens e adultos', '', 0, 0, 41, NULL, '2022-10-27 00:28:50', '2022-10-27 01:28:01');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
