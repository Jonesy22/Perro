DROP TABLE IF EXISTS `UserAccessibleTasks`;
DROP TABLE IF EXISTS `Commits`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE `Users` (
  `userID` varchar(21) NOT NULL UNIQUE,
  `googleToken` varchar(2048) NOT NULL,
  `sessionID` varchar(32),
  `fname` varchar (255),
  `lname` varchar (255),
  `email` varchar (255),
  PRIMARY KEY (`userID`)
);

INSERT INTO `Users` (`userID`, `googleToken`, `fname`, `lname`, `email`) VALUES ('1', 'asdf', 'fname0','lname0','user0@email.com'), ('2', 'asdf1', 'fname1','lname1','user1@email.com'), ('3', 'asdf2', 'fname2','lname2','user2@email.com'), ('4', 'asdf0', 'fname3','lname3','user3@email.com'), ('5', 'asdf3', 'fname4','lname4','user4@email.com'), ('6', 'asdf4', 'fname5','lname5','user5@email.com'), ('7', 'asdf5', 'fname6','lname6','user6@email.com'), ('8', 'asdf6', 'fname7','lname7','user7@email.com'), ('9', 'asdf7', 'fname8','lname8','user8@email.com'), ('10', 'asdf8', 'fname9','lname9','user9@email.com');

CREATE TABLE `Tasks` (
  `taskID` int(11) NOT NULL AUTO_INCREMENT,
  `parentID` int(11),
  `tname` varchar (255),
  `timeEstimate` int(11),
  `summary` text,
  `description` text,
  `dueDate` DATE,
  PRIMARY KEY (`taskID`)
);

INSERT INTO `Tasks` (`taskID`, `parentID`, `tname`, `timeEstimate`, `summary`, `description`) VALUES (1, NULL, 'Project 1', 10, 'This is the summary for the first main project', 'desc for first main project'), (2, NULL, 'Project 2', 10, 'This is the summary for the first main project', 'desc for first main project'), (3, NULL, 'Project 3', 10, 'This is the summary for the first main project', 'desc for first main project'), (4, NULL, 'Project 4', 10, 'This is the summary for the first main project', 'desc for first main project'), (5, NULL, 'Project 5', 10, 'This is the summary for the first main project', 'desc for first main project'), (6, NULL, 'Project 6', 10, 'This is the summary for the first main project', 'desc for first main project'), (7, NULL, 'Project 7', 10, 'This is the summary for the first main project', 'desc for first main project'), (8, NULL, 'Project 8', 10, 'This is the summary for the first main project', 'desc for first main project'), (9, NULL, 'Project 9', 10, 'This is the summary for the first main project', 'desc for first main project'), (10, NULL, 'Project 10', 10, 'This is the summary for the first main project', 'desc for first main project'), (11, NULL, 'Project 11', 10, 'This is the summary for the first main project', 'desc for first main project'), (12, NULL, 'Project 12', 10, 'This is the summary for the first main project', 'desc for first main project'), (13, NULL, 'Project 13', 10, 'This is the summary for the first main project', 'desc for first main project'), (14, NULL, 'Project 14', 10, 'This is the summary for the first main project', 'desc for first main project'), (15, NULL, 'Project 15', 10, 'This is the summary for the first main project', 'desc for first main project'), (16, NULL, 'Project 16', 10, 'This is the summary for the first main project', 'desc for first main project'), (17, NULL, 'Project 17', 10, 'This is the summary for the first main project', 'desc for first main project'), (18, NULL, 'Project 18', 10, 'This is the summary for the first main project', 'desc for first main project'), (19, NULL, 'Project 19', 10, 'This is the summary for the first main project', 'desc for first main project'), (20, NULL, 'Project 20', 10, 'This is the summary for the first main project', 'desc for first main project'), (21, NULL, 'Project 21', 10, 'This is the summary for the first main project', 'desc for first main project'), (22, NULL, 'Project 22', 10, 'This is the summary for the first main project', 'desc for first main project'), (23, NULL, 'Project 23', 10, 'This is the summary for the first main project', 'desc for first main project'), (24, NULL, 'Project 24', 10, 'This is the summary for the first main project', 'desc for first main project'), (25, NULL, 'Project 25', 10, 'This is the summary for the first main project', 'desc for first main project'), (26, NULL, 'Project 26', 10, 'This is the summary for the first main project', 'desc for first main project'), (27, NULL, 'Project 27', 10, 'This is the summary for the first main project', 'desc for first main project'), (28, NULL, 'Project 28', 10, 'This is the summary for the first main project', 'desc for first main project'), (29, NULL, 'Project 29', 10, 'This is the summary for the first main project', 'desc for first main project'), (30, NULL, 'Project 30', 10, 'This is the summary for the first main project', 'desc for first main project'), (31, NULL, 'Project 31', 10, 'This is the summary for the first main project', 'desc for first main project'), (32, NULL, 'Project 32', 10, 'This is the summary for the first main project', 'desc for first main project'), (33, NULL, 'Project 33', 10, 'This is the summary for the first main project', 'desc for first main project'), (34, NULL, 'Project 34', 10, 'This is the summary for the first main project', 'desc for first main project'), (35, NULL, 'Project 35', 10, 'This is the summary for the first main project', 'desc for first main project'), (36, NULL, 'Project 36', 10, 'This is the summary for the first main project', 'desc for first main project'), (37, NULL, 'Project 37', 10, 'This is the summary for the first main project', 'desc for first main project'), (38, NULL, 'Project 38', 10, 'This is the summary for the first main project', 'desc for first main project'), (39, NULL, 'Project 39', 10, 'This is the summary for the first main project', 'desc for first main project'), (40, NULL, 'Project 40', 10, 'This is the summary for the first main project', 'desc for first main project'), (41, NULL, 'Project 41', 10, 'This is the summary for the first main project', 'desc for first main project'), (42, NULL, 'Project 42', 10, 'This is the summary for the first main project', 'desc for first main project'), (43, NULL, 'Project 43', 10, 'This is the summary for the first main project', 'desc for first main project'), (44, NULL, 'Project 44', 10, 'This is the summary for the first main project', 'desc for first main project'), (45, NULL, 'Project 45', 10, 'This is the summary for the first main project', 'desc for first main project'), (46, NULL, 'Project 46', 10, 'This is the summary for the first main project', 'desc for first main project'), (47, NULL, 'Project 47', 10, 'This is the summary for the first main project', 'desc for first main project'), (48, NULL, 'Project 48', 10, 'This is the summary for the first main project', 'desc for first main project'), (49, NULL, 'Project 49', 10, 'This is the summary for the first main project', 'desc for first main project'), (50, NULL, 'Project 50', 10, 'This is the summary for the first main project', 'desc for first main project');
INSERT INTO `Tasks` VALUES (51, 1, 'Task 1', 3, 'subtask for project 1', 'description 1', '2021-02-15'), (52, 51, 'Subtask 1', 1, 'subtask of a subtask of a project', 'desc', '2021-02-16'), (53, 1, 'Task 2', 5, 'subtask for project 1', 'description 2', '2021-02-17'), (54, 1, 'Task 3', 3, 'subtask for project 1', 'description 3', '2021-02-18'), (55, 53, 'Subtask 1', 1, 'subtask of a subtask of a project', 'desc 2', '2021-02-19'), (56, 53, 'Subtask 2', 1, 'subtask of a subtask of a project', 'desc 3', '2021-02-20');

CREATE TABLE `UserAccessibleTasks` (
  `userID` varchar(21) NOT NULL,
  `taskID` int(11) NOT NULL,
  PRIMARY KEY (`userID`, `taskID`),
  FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE,
  FOREIGN KEY (`taskID`) REFERENCES `Tasks` (`taskID`) ON DELETE CASCADE
);

INSERT INTO `UserAccessibleTasks` VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9);
INSERT INTO `UserAccessibleTasks` VALUES (1, 51), (1, 52), (1, 53), (1, 54), (1, 55), (1, 56); 

CREATE TABLE `Commits` (
  `commitID` int(11) NOT NULL AUTO_INCREMENT,
  `parentTaskID` int(11) NOT NULL,
  `commitMessage` text,
  `timeWorked` double,
  `commitingUserID` int(11),
  `commitTime` timestamp,
  PRIMARY KEY (`commitID`),
  FOREIGN KEY (`parentTaskID`) REFERENCES `Tasks` (`taskID`)
);

INSERT INTO `Commits` VALUES (1, 1, 'Added subtasks to project 1 so reduced project overhead time', -8, 1, '2021-01-020 2:19:03');