INSERT INTO daycare.DAYCARE("ID", "NAME") VALUES ('2b958205-848b-4376-9c9d-5bfa39c70ee0', 'Ma garderie');

INSERT INTO daycare.ROLE ("ID", "NAME", "DESCRIPTION") VALUES
(1, 'EDUCATOR', 'Daycare educator'),
(2, 'ADMIN', 'Daycare admin'),
(3, 'PARENT', 'Daycare parent');

-- USER
-- non-encrypted password: jwtpass
INSERT INTO daycare.USER ("ID", "FIRST_NAME", "LAST_NAME", "PASSWORD", "USERNAME", "DAYCARE") VALUES
('f13be1c0-9027-421f-8cf3-c3fdfa735a2a', 'John', 'Doe', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'johndoe@daycare.com','2b958205-848b-4376-9c9d-5bfa39c70ee0'),
('f13be1c0-9027-421f-8cf3-c3fdfa735a3a', 'Admin', 'Admin', '$2a$10$ZTl3Ct8F54qweI8ZBxJ7ce9wuE0u5ldgOvGpVBODphiCrT1ezl/9O', 'admin@daycare.com','2b958205-848b-4376-9c9d-5bfa39c70ee0'),
('f13be1c0-9027-421f-8cf3-c3fdfa735a4a', 'Par', 'Ent', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'parent@daycare.com','2b958205-848b-4376-9c9d-5bfa39c70ee0'),
('f13be1c0-9027-421f-8cf3-c3fdfa735a5a', 'Test', 'Test', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'test.test@test.com','2b958205-848b-4376-9c9d-5bfa39c70ee0');

INSERT INTO daycare.USER_ROLE("USER_ID", "ROLE_ID") VALUES
('f13be1c0-9027-421f-8cf3-c3fdfa735a2a',1),
('f13be1c0-9027-421f-8cf3-c3fdfa735a3a',1),
('f13be1c0-9027-421f-8cf3-c3fdfa735a3a',2),
('f13be1c0-9027-421f-8cf3-c3fdfa735a4a',3),
('f13be1c0-9027-421f-8cf3-c3fdfa735a5a',2);

INSERT INTO daycare.CHILD("ID", "FIRSTNAME", "LASTNAME", "DAYCARE") VALUES
('f13be1c0-9027-421f-8cf3-c3fdfa735aaa', 'Arthur','B','2b958205-848b-4376-9c9d-5bfa39c70ee0'),
('7654fe79-5b38-4738-a899-6c49a2a69d3c', 'Louis','B','2b958205-848b-4376-9c9d-5bfa39c70ee0');

--Child 1
INSERT INTO daycare.SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") VALUES
('89033907-13b0-46b9-8f5d-67e6e7b1facd', 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 1 a','BAD','MEDIUM','GOOD',CURRENT_DATE),
(2, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 2','GOOD','MEDIUM','BAD',  TO_TIMESTAMP ( '25/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(3, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 3','MEDIUM','MEDIUM','MEDIUM', TO_TIMESTAMP ( '24/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(4, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 4','BAD','BAD','BAD',TO_TIMESTAMP ( '23/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(5, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 5','GOOD','GOOD','GOOD',TO_TIMESTAMP ( '22/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(6, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 6','MEDIUM','BAD','GOOD',TO_TIMESTAMP ( '21/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(7, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 7','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '20/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(8, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 7','GOOD','BAD','GOOD',TO_TIMESTAMP ( '19/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(9, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 9','BAD','GOOD','GOOD',TO_TIMESTAMP ( '18/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(10, 'f13be1c0-9027-421f-8cf3-c3fdfa735aaa','comment 10','BAD','GOOD','GOOD',TO_TIMESTAMP ( '17/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),

--Child 2
(11, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 1 l','BAD','MEDIUM','GOOD',CURRENT_DATE),
(12, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 2','GOOD','MEDIUM','GOOD',TO_TIMESTAMP ( '25/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(13, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 3','GOOD','MEDIUM','GOOD',TO_TIMESTAMP ( '24/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(14, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 4','BAD','BAD','GOOD',TO_TIMESTAMP ( '23/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(15, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 5','BAD','MEDIUM','BAD',TO_TIMESTAMP ( '22/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(16, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 6','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '21/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(17, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 7','BAD','GOOD','BAD',TO_TIMESTAMP ( '20/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(18, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 8','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '19/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(19, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 9','GOOD','MEDIUM','GOOD',TO_TIMESTAMP ( '18/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' )),
(20, '7654fe79-5b38-4738-a899-6c49a2a69d3c','comment 10','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '17/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));


INSERT INTO daycare.NEED("ID","CODE") VALUES ('6ad2ef8b-f5d0-40e4-80ab-e6c0888c46cd','TEST');





 


