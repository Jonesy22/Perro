-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2021 at 08:47 PM
-- Server version: 10.4.18-MariaDB-log
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone_2021_group60`
--

-- --------------------------------------------------------

--
-- Table structure for table `Commits`
--

CREATE TABLE `Commits` (
  `commitID` int(11) NOT NULL,
  `commitName` varchar(255) DEFAULT NULL,
  `parentTaskID` int(11) NOT NULL,
  `commitMessage` text DEFAULT NULL,
  `timeWorked` double DEFAULT NULL,
  `committingUserID` varchar(21) DEFAULT NULL,
  `commitCompleted` tinyint(1) DEFAULT NULL,
  `commitTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Tasks`
--

CREATE TABLE `Tasks` (
  `taskID` int(11) NOT NULL,
  `parentID` int(11) DEFAULT NULL,
  `tname` varchar(255) DEFAULT NULL,
  `timeEstimate` int(11) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `userId` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Teams`
--

CREATE TABLE `Teams` (
  `teamID` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `TeamsAccessibleTasks`
--

CREATE TABLE `TeamsAccessibleTasks` (
  `teamID` int(11) NOT NULL,
  `taskID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `TeamUsers`
--

CREATE TABLE `TeamUsers` (
  `teamID` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `teamAdmin` tinyint(1) DEFAULT NULL,
  `acceptedInvite` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `UserAccessibleTasks`
--

CREATE TABLE `UserAccessibleTasks` (
  `userID` varchar(21) NOT NULL,
  `taskID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userID` varchar(21) NOT NULL,
  `googleToken` varchar(2048) NOT NULL,
  `sessionID` varchar(32) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Commits`
--
ALTER TABLE `Commits`
  ADD PRIMARY KEY (`commitID`),
  ADD KEY `parentTaskID` (`parentTaskID`);

--
-- Indexes for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD PRIMARY KEY (`taskID`),
  ADD KEY `FK_MT_Parent` (`parentID`);

--
-- Indexes for table `Teams`
--
ALTER TABLE `Teams`
  ADD PRIMARY KEY (`teamID`);

--
-- Indexes for table `TeamsAccessibleTasks`
--
ALTER TABLE `TeamsAccessibleTasks`
  ADD PRIMARY KEY (`teamID`,`taskID`),
  ADD KEY `taskID` (`taskID`);

--
-- Indexes for table `TeamUsers`
--
ALTER TABLE `TeamUsers`
  ADD PRIMARY KEY (`teamID`,`userEmail`),
  ADD KEY `userEmail` (`userEmail`);

--
-- Indexes for table `UserAccessibleTasks`
--
ALTER TABLE `UserAccessibleTasks`
  ADD PRIMARY KEY (`userID`,`taskID`),
  ADD KEY `taskID` (`taskID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userID` (`userID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Commits`
--
ALTER TABLE `Commits`
  MODIFY `commitID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `taskID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Teams`
--
ALTER TABLE `Teams`
  MODIFY `teamID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TeamUsers`
--
ALTER TABLE `TeamUsers`
  MODIFY `teamID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Commits`
--
ALTER TABLE `Commits`
  ADD CONSTRAINT `Commits_ibfk_1` FOREIGN KEY (`parentTaskID`) REFERENCES `Tasks` (`taskID`) ON DELETE CASCADE;

--
-- Constraints for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD CONSTRAINT `FK_MT_Parent` FOREIGN KEY (`parentID`) REFERENCES `Tasks` (`taskID`) ON DELETE CASCADE;

--
-- Constraints for table `TeamsAccessibleTasks`
--
ALTER TABLE `TeamsAccessibleTasks`
  ADD CONSTRAINT `TeamsAccessibleTasks_ibfk_1` FOREIGN KEY (`teamID`) REFERENCES `Teams` (`teamID`) ON DELETE CASCADE,
  ADD CONSTRAINT `TeamsAccessibleTasks_ibfk_2` FOREIGN KEY (`taskID`) REFERENCES `Tasks` (`taskID`) ON DELETE CASCADE;

--
-- Constraints for table `TeamUsers`
--
ALTER TABLE `TeamUsers`
  ADD CONSTRAINT `TeamUsers_ibfk_1` FOREIGN KEY (`teamID`) REFERENCES `Teams` (`teamID`) ON DELETE CASCADE;

--
-- Constraints for table `UserAccessibleTasks`
--
ALTER TABLE `UserAccessibleTasks`
  ADD CONSTRAINT `UserAccessibleTasks_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `UserAccessibleTasks_ibfk_2` FOREIGN KEY (`taskID`) REFERENCES `Tasks` (`taskID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
