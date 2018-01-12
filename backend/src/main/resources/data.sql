insert into DAYCARE("ID", "NAME") values (1, 'Ma garderie');

INSERT INTO ROLE ("ID", "NAME", "DESCRIPTION") VALUES (1, 'EDUCATOR', 'Daycare educator');
INSERT INTO ROLE ("ID", "NAME", "DESCRIPTION") VALUES (2, 'ADMIN', 'Daycare admin');
INSERT INTO ROLE ("ID", "NAME", "DESCRIPTION") VALUES (3, 'PARENT', 'Daycare parent');

-- USER
-- non-encrypted password: jwtpass
INSERT INTO USER ("ID", "FIRST_NAME", "LAST_NAME", "PASSWORD", "USERNAME", "DAYCARE") VALUES (1, 'John', 'Doe', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'johndoe',1);
INSERT INTO USER ("ID", "FIRST_NAME", "LAST_NAME", "PASSWORD", "USERNAME", "DAYCARE") VALUES (2, 'Admin', 'Admin', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'admin',1);
INSERT INTO USER ("ID", "FIRST_NAME", "LAST_NAME", "PASSWORD", "USERNAME", "DAYCARE") VALUES (3, 'Par', 'Ent', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'parent',1);
INSERT INTO USER ("ID", "FIRST_NAME", "LAST_NAME", "PASSWORD", "USERNAME", "DAYCARE") VALUES (4, 'Test', 'Test', '821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a', 'test.test@test.com',1);

INSERT INTO USER_ROLE("USER_ID", "ROLE_ID") VALUES(1,1);
INSERT INTO USER_ROLE("USER_ID", "ROLE_ID") VALUES(2,1);
INSERT INTO USER_ROLE("USER_ID", "ROLE_ID") VALUES(2,2);
INSERT INTO USER_ROLE("USER_ID", "ROLE_ID") VALUES(3,3);
INSERT INTO USER_ROLE("USER_ID", "ROLE_ID") VALUES(4,2);

insert into CHILD("ID", "FIRSTNAME", "LASTNAME", "DAYCARE") values (1, 'Arthur','B',1);
insert into CHILD("ID", "FIRSTNAME", "LASTNAME", "DAYCARE") values (2, 'Louis','B',1);

--Child 1
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (1, 1,'comment 1 a','BAD','MEDIUM','GOOD',CURRENT_DATE);
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (2, 1,'comment 2','GOOD','MEDIUM','BAD',  TO_TIMESTAMP ( '25/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (3, 1,'comment 3','MEDIUM','MEDIUM','MEDIUM', TO_TIMESTAMP ( '24/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (4, 1,'comment 4','BAD','BAD','BAD',TO_TIMESTAMP ( '23/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (5, 1,'comment 5','GOOD','GOOD','GOOD',TO_TIMESTAMP ( '22/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (6, 1,'comment 6','MEDIUM','BAD','GOOD',TO_TIMESTAMP ( '21/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (7, 1,'comment 7','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '20/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (8, 1,'comment 7','GOOD','BAD','GOOD',TO_TIMESTAMP ( '19/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (9, 1,'comment 9','BAD','GOOD','GOOD',TO_TIMESTAMP ( '18/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (10, 1,'comment 10','BAD','GOOD','GOOD',TO_TIMESTAMP ( '17/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));

--Child 2
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (11, 2,'comment 1 l','BAD','MEDIUM','GOOD',CURRENT_DATE);
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (12, 2,'comment 2','GOOD','MEDIUM','GOOD',TO_TIMESTAMP ( '25/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (13, 2,'comment 3','GOOD','MEDIUM','GOOD',TO_TIMESTAMP ( '24/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (14, 2,'comment 4','BAD','BAD','GOOD',TO_TIMESTAMP ( '23/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (15, 2,'comment 5','BAD','MEDIUM','BAD',TO_TIMESTAMP ( '22/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (16, 2,'comment 6','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '21/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (17, 2,'comment 7','BAD','GOOD','BAD',TO_TIMESTAMP ( '20/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (18, 2,'comment 8','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '19/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (19, 2,'comment 9','GOOD','MEDIUM','GOOD',TO_TIMESTAMP ( '18/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));
insert into SUMUP("ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY") values (20, 2,'comment 10','BAD','MEDIUM','GOOD',TO_TIMESTAMP ( '17/12/2017 00:00:00.00', 'dd-MM-yyyy hh:mm:ss.SS' ));


insert into NEED("ID","CODE") values (1,'TEST');





 


