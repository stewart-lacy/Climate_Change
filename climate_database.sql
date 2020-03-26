CREATE TABLE climate_data (
	country varchar(45),
	year int,
	total_co2_fossil_cement int,
	emissions_solid_fuel int,
	emissions_liquid_fuel int,
	emissions_gas_fuel int,
	emissions_cement int,
	emissions_gas_flaring int,
	per_capita_co2_emissions int,
	emissions_bunker_fuel int
);


CREATE TABLE country_lat_long (country_id varchar(2),
latitude int,
longitude int,
country varchar(45));

drop table country_lat_long
drop table climate_data

select from climate_data
