
DROP TABLE climate_data;

CREATE TABLE climate_data (
	country_std VARCHAR(50) PRIMARY KEY,
	year_1995 DECIMAL,
	year_1996 DECIMAL,
	year_1997 DECIMAL,
	year_1998 DECIMAL,
	year_1999 DECIMAL,
	year_2000 DECIMAL,
	year_2001 DECIMAL,
	year_2002 DECIMAL,
	year_2003 DECIMAL,
	year_2004 DECIMAL,
	year_2005 DECIMAL,
	year_2006 DECIMAL,
	year_2007 DECIMAL,
	year_2008 DECIMAL,
	year_2009 DECIMAL,
	year_2010 DECIMAL,
	year_2011 DECIMAL,
	year_2012 DECIMAL,
	year_2013 DECIMAL,
	year_2014 DECIMAL,
	country VARCHAR(2),
	latitude DECIMAL,
	longitude DECIMAL
);

SELECT * FROM climate_data;
