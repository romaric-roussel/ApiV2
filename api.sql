-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 18 fév. 2019 à 23:53
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `api`
--

-- --------------------------------------------------------

--
-- Structure de la table `amis`
--

CREATE TABLE `amis` (
  `id_amis` int(11) NOT NULL,
  `id_utilisateur1` int(11) NOT NULL,
  `id_utilisateur2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `liste_pokemon`
--

CREATE TABLE `liste_pokemon` (
  `id_liste` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_pokemon` int(11) NOT NULL,
  `nb_exemplaire` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `liste_type`
--

CREATE TABLE `liste_type` (
  `id` int(11) NOT NULL,
  `libelle` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `liste_type`
--

INSERT INTO `liste_type` (`id`, `libelle`) VALUES
(1, 'fb'),
(2, 'google'),
(3, 'login');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `type_connexion` int(11) NOT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `prenom`, `mail`, `mdp`, `type_connexion`, `photo`) VALUES
(55, 'Avuru-Duma', 'eliane', 'haieliane@hotmail.com', '5495', 1, '545'),
(58, 'rogsussel', 'rogggmaric', 'toto', '$2b$10$4PXLcmVyf7SikB6qQXIoV.Bp8i4k37mgiI8GuHVQKqogXV0HX3soa', 3, 'pg'),
(63, 'rogsussel', 'rogggmaric', 'totdo', '$2b$10$zO9HlAf0GJe/4qbPjSYlTeZOdxro3UVlwuVt0vsD..8SmZYhhHa2e', 3, 'pg'),
(64, 'roussel', 'romaric', 'lancefire@hotmail.fr', '$2b$10$XsTpJMKk19ob0UYk8tI0muVtwXhB09sGMSD6GU0iDHooTDjKPCOEG', 3, 'pg'),
(65, 'roussel', 'romaric', 'lancefires@hotmail.fr', '$2b$10$RQzD3ospoLi3JoWKyLWsbeTd/Gcm1pvhEMJPJjWWREDwIvOrn5gWy', 3, 'pg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `amis`
--
ALTER TABLE `amis`
  ADD PRIMARY KEY (`id_amis`),
  ADD KEY `id_utilisateur1` (`id_utilisateur1`,`id_utilisateur2`),
  ADD KEY `id_utilisateur2` (`id_utilisateur2`);

--
-- Index pour la table `liste_pokemon`
--
ALTER TABLE `liste_pokemon`
  ADD PRIMARY KEY (`id_liste`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_pokemon` (`id_pokemon`);

--
-- Index pour la table `liste_type`
--
ALTER TABLE `liste_type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `fk_type_connexion` (`type_connexion`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `amis`
--
ALTER TABLE `amis`
  MODIFY `id_amis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `liste_pokemon`
--
ALTER TABLE `liste_pokemon`
  MODIFY `id_liste` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `liste_type`
--
ALTER TABLE `liste_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `amis`
--
ALTER TABLE `amis`
  ADD CONSTRAINT `amis_ibfk_1` FOREIGN KEY (`id_utilisateur1`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `amis_ibfk_2` FOREIGN KEY (`id_utilisateur2`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `liste_pokemon`
--
ALTER TABLE `liste_pokemon`
  ADD CONSTRAINT `liste_pokemon_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `liste_pokemon_ibfk_2` FOREIGN KEY (`id_pokemon`) REFERENCES `pokemon` (`id_pokemon`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `fk_type_connexion` FOREIGN KEY (`type_connexion`) REFERENCES `liste_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;