-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 18. 19:01
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `login`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejelentkezes`
--

CREATE TABLE `bejelentkezes` (
  `ID` int(11) NOT NULL,
  `email` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `filmek` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `sorozat` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bejelentkezes`
--

INSERT INTO `bejelentkezes` (`ID`, `email`, `username`, `password`, `filmek`, `sorozat`) VALUES
(8, 'a@a', 'a', 'a', '[]', '[]'),
(9, 'fjkoofmckhackmakck@gmx.at', 'Franz Joseph von Österreich Osztrák főherceg, magyar és cseh királyi herceg, Ausztria császára, Magyarország apostoli királya, Csehország királya', 'Sissi4816', '[]', '[]'),
(10, 'ironmasked74@gmail.com', 'Leonardo DiCaprio', 'LeO74', '[]', '[]'),
(11, 'evenihatethisseries@gmail.com', 'Veréb Tamás', 't0msp4rr0w', '[]', '[]');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `currentuser`
--

CREATE TABLE `currentuser` (
  `firstID` int(11) NOT NULL,
  `ID` int(11) NOT NULL,
  `email` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `filmek` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`filmek`)),
  `sorozat` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`sorozat`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `currentuser`
--

INSERT INTO `currentuser` (`firstID`, `ID`, `email`, `username`, `password`, `filmek`, `sorozat`) VALUES
(1, 8, 'a@a', 'a', 'a', '\"[]\"', '\"[]\"');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejelentkezes`
--
ALTER TABLE `bejelentkezes`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `currentuser`
--
ALTER TABLE `currentuser`
  ADD PRIMARY KEY (`firstID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejelentkezes`
--
ALTER TABLE `bejelentkezes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `currentuser`
--
ALTER TABLE `currentuser`
  MODIFY `firstID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
