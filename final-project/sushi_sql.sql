DROP TABLE IF EXISTS s_order;
DROP TABLE IF EXISTS s_payment;
DROP TABLE IF EXISTS s_account;
DROP TABLE IF EXISTS s_customer;
DROP TABLE IF EXISTS s_product;

CREATE TABLE s_product (
	productName VARCHAR(50) NOT NULL,
    price NUMERIC(7,2) NOT NULL,
    ingredients VARCHAR(300) NOT NULL,
    imgPath VARCHAR(50) NOT NULL,
    PRIMARY KEY(productName)
);

CREATE TABLE s_customer (
	customerId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(75) NOT NULL,
    lastName VARCHAR(75) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    zip INT NOT NULL,
    PRIMARY KEY(customerId)
);

CREATE TABLE s_account (
	username VARCHAR(75) NOT NULL,
	password VARCHAR(72) NOT NULL,
	customerId INT NOT NULL,
    PRIMARY KEY(username),
    FOREIGN KEY(customerId) 
		REFERENCES s_customer(customerId)
);

CREATE TABLE s_payment (
	cardNumber BIGINT NOT NULL,
	cardNetwork VARCHAR(20) NOT NULL,
    expiration DATE NOT NULL,
    customerId INT NOT NULL,
    PRIMARY KEY(cardNumber),
    FOREIGN KEY(customerId)
		REFERENCES s_customer(customerId)
);

CREATE TABLE s_order (
	orderId INT NOT NULL AUTO_INCREMENT,
    customerId INT NOT NULL,
    quantity INT NOT NULL,
    amount NUMERIC(7,2) NOT NULL,
    date DATE NOT NULL,
    cardLastFour INT NOT NULL,
    PRIMARY KEY(orderId),
    FOREIGN KEY(customerId)
		REFERENCES s_customer(customerId)
)