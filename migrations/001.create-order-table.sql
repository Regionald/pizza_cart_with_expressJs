CREATE TABLE ORDERS (
	id integer primary key AUTOINCREMENT,
    userName varchar(255),
    smallQty integer DEFAULT 0,
    mediumQty integer DEFAULT 0,
    largeQty integer DEFAULT 0,
    status varchar(255) DEFAULT 'payment due',
    total integer DEFAULT 0
);