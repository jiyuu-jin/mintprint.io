CREATE TABLE prints (
    shortName varchar(255),
    tokenAddress varchar(255),
    tokenID varchar(255),
    printCID varchar(255)
);

INSERT INTO prints (shortName, tokenAddress, tokenID, printCID)
VALUES ('test', 'test', 'test', 'test');

SELECT * FROM prints;

SELECT * FROM prints WHERE shortname='test';