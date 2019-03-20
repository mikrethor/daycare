DROP TABLE IF EXISTS daycare.need;
DROP TABLE IF EXISTS daycare.sumup;
DROP TABLE IF EXISTS daycare.child;
DROP TABLE IF EXISTS daycare.user;
DROP TABLE IF EXISTS daycare.user_role;
DROP TABLE IF EXISTS daycare.role;
DROP TABLE IF EXISTS daycare.daycare;

CREATE TABLE daycare.daycare (

    ID                            UUID        NOT NULL,
    NAME                          VARCHAR(30) NOT NULL,

    PRIMARY KEY (ID)
);

CREATE TABLE daycare.role (

    ID                            UUID        NOT NULL,
    NAME                          VARCHAR(10) NOT NULL,
    DESCRIPTION                   VARCHAR(30) NOT NULL,

    PRIMARY KEY (ID)
);

CREATE TABLE daycare.user (

    ID                            UUID        NOT NULL,
    FIRST_NAME                    VARCHAR(30) NOT NULL,
    LAST_NAME                     VARCHAR(30) NOT NULL,
    PASSWORD                      VARCHAR(100) NOT NULL,
    USERNAME                      VARCHAR(20) NOT NULL,
    DAYCARE                       UUID        NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (DAYCARE) REFERENCES daycare.daycare(ID)
);

CREATE TABLE daycare.user_role (

    USER_ID                       UUID,
    ROLE_ID                       UUID
);

CREATE TABLE daycare.child (

    ID                            UUID        NOT NULL,
    FIRSTNAME                    VARCHAR(30) NOT NULL,
    LASTNAME                     VARCHAR(30) NOT NULL,
    DAYCARE                       UUID        NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (DAYCARE) REFERENCES daycare.daycare(ID)
);

--"ID", "ID_CHILD", "COMMENT", "MOOD", "APPETITE", "SLEEP", "DAY"
CREATE TABLE daycare.sumup (

    ID                            UUID        NOT NULL,
    COMMENT                       VARCHAR(100)NOT NULL,
    MOOD                          VARCHAR(30) NOT NULL,
    APPETITE                      VARCHAR(30) NOT NULL,
    SLEEP                         VARCHAR(30) NOT NULL,
    DAY                           VARCHAR(30) NOT NULL,
    ID_CHILD                      UUID        NOT NULL,
--    DAYCARE                       UUID        NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (ID_CHILD) REFERENCES daycare.child(ID),
--    FOREIGN KEY (DAYCARE) REFERENCES daycare.daycare(ID)
);

CREATE TABLE daycare.need (

    ID                            UUID        NOT NULL,
    CODE                          VARCHAR(30) NOT NULL,

    PRIMARY KEY (ID)
);


