-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 12 jul 2024 om 02:55
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `gif` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `cover` varchar(255) NOT NULL,
  `img1` varchar(255) DEFAULT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `projects`
--

INSERT INTO `projects` (`id`, `name`, `category`, `description`, `gif`, `path`, `createdAt`, `cover`, `img1`, `img2`, `img3`) VALUES
(12, 'Spidermen Forum', 'School', 'For the second php based project I was tasked with creating a fully functional forum. \r\nThis was around the time Spiderman : Across the spiderverse released. \r\nSo I was highly motivated to create a spiderman inspired forum.', '1720741452118-smgif.gif', 'none', '2024-07-11 23:44:12.142', '1720741452114-sm1.png', '1720741452126-sm1.png', '1720741452130-sm2.png', '1720741452134-sm3.png'),
(13, 'Irritating Webpage', 'School', 'For the second project in my school year I was tasked to team up with a classmate.\r\nOur assignment was to research, design and create the most annoying webpage we could think off.', '1720741699808-irigif.gif', 'none', '2024-07-11 23:48:19.856', '1720741699796-iri1.jpg', '1720741699837-iri1.jpg', '1720741699845-iri2.png', '1720741699850-iri3.png'),
(14, 'Whack A Mom', 'School', 'For the third assignment of my first school year I got the task to create a webgame while making use of JavaScript.\r\nAfter looking around for a bit on what type of game I wanted to create I got the idea to make a Whack a mole game. Not wanting to make another game where you smack moles I asked a friend who is developing a game if I could use some of the games assets, and so Whack A Mom was born.', '1720742071286-wamgif.gif', 'none', '2024-07-11 23:54:31.309', '1720742071280-wamc.png', '1720742071291-wam1.png', '1720742071296-wam2.png', '1720742071301-wam3.png');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_admin`) VALUES
(1, 'rick_muda', 'M08B@DKhZU9V', 'rickambergen25@gmail.com', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `wip`
--

CREATE TABLE `wip` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `cover` varchar(255) NOT NULL,
  `gif` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `img1` varchar(255) DEFAULT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Gegevens worden geëxporteerd voor tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('5c194079-0890-43f1-b3e8-7e9b5e520e9d', '325561ac9e25ffb5da27c063f79bbaf83bb137a806e7f2da32d36142baf3190b', '2024-07-08 21:17:22.470', '20240708211722_portfolio_1_0', NULL, NULL, '2024-07-08 21:17:22.161', 1),
('5eeb05b6-c6db-44e5-a201-6e10e2ff0ba9', '38a1cd165465c03ef4fd16e562e72ee3b839f4e290f3881a62a203b9b151abe4', '2024-07-08 21:17:14.615', '20240619132402_portfolio', NULL, NULL, '2024-07-08 21:17:14.175', 1),
('795321ca-8c00-4ead-9a98-cfd6629f8e74', '3a0af66d7c680ea9911ccce07aba0ffee7dafb25b0b2aed7894513238acd38b5', '2024-07-08 21:17:15.206', '20240704090131_', NULL, NULL, '2024-07-08 21:17:14.899', 1),
('f4f9696b-1c87-4276-9773-91665f56afbd', '278012f8c04419732744f3abaa0a0ebc6c64d9419d49200143749c62c3575e5f', '2024-07-08 21:17:14.858', '20240619132532_portfolio', NULL, NULL, '2024-07-08 21:17:14.649', 1);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexen voor tabel `wip`
--
ALTER TABLE `wip`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `wip`
--
ALTER TABLE `wip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
