CREATE TABLE prints (
    shortName varchar(255),
    tokenAddress varchar(255),
    tokenID varchar(255),
    printType varchar(255),
    printCID varchar(255),
    productType varchar(255)
);

INSERT INTO prints (shortName, tokenAddress, tokenID, printType, printCID, productType)
VALUES ('zpelkey', '0x56ff73344234D78d2486Ca38858620f4ca18e401', '1', 'free', 'QmQP8PxFWkqoSFwzi3RBHyS5tnDct2bnwaA2TzNL4mwbvf');

INSERT INTO prints (shortName, tokenAddress, tokenID, printType, printCID, productType)
VALUES ('awantoch', '0x56ff73344234D78d2486Ca38858620f4ca18e401', '2', 'free', 'QmQP8PxFWkqoSFwzi3RBHyS5tnDct2bnwaA2TzNL4mwbvf');

SELECT * FROM prints;

SELECT * FROM prints WHERE shortname='zpelkey';

DROP TABLE prints;