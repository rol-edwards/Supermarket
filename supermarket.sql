
create database supermarket;

use supermarket;

create table weekly (
	product varchar(20), 
	week_commencing date, 
	exposed integer, 
	control integer
);

create table top (
	metric varchar(20), 
	product varchar(20), 
	exposed float, 
	control float, 
	uplift float, 
	pct_uplift float
);

load data local infile 'data/weekly.csv' into table weekly fields terminated by ',' lines terminated by '\n' ignore 1 lines;

load data local infile 'data/top.csv' into table top fields terminated by ',' lines terminated by '\n' ignore 1 lines;

