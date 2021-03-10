CREATE TABLE users (
	id serial,
	email TEXT NOT NULL,
	hide_email BOOLEAN NOT NULL DEFAULT TRUE,
	password TEXT NOT NULL,
	department TEXT NOT NULL,
	address TEXT,
	user_type TEXT,
	registration_date TIMESTAMP NOT NULL DEFAULT NOW(),
	last_login TIMESTAMP,
	db_created_on TIMESTAMP,
	db_updated_on TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE TYPE person AS (family_name text, given_name text, email text, division text);
CREATE TYPE related_url AS (url TEXT, url_type TEXT);

CREATE TABLE articles (
	id serial,
	item_type TEXT,
	title TEXT NOT NULL,
	abstract TEXT,
	creators person[],
	corporate_creators TEXT[],
	editors person[],
	is_refereed BOOLEAN,
	status VARCHAR(20),
	publication_title TEXT, 
	issn_isbn TEXT,
	publisher TEXT,
	official_url TEXT,
	volume INTEGER,
	place_of_publication TEXT,
	number_of_pages INTEGER,
	number INTEGER,
	page_range INTEGER[2],
	date TIMESTAMP,
	date_type TEXT,
	identification_number TEXT,
	series_name TEXT,
	related_urls related_url[],
	funders TEXT[],
	projects TEXT[],
	contact_email_address TEXT,
	reference TEXT,
	uncontrolled_keywords TEXT,
	additional_infor TEXT,
	comments_and_suggestions TEXT,
	is_approved BOOLEAN DEFAULT FALSE,
	db_created_on TIMESTAMP,
	db_updated_on TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE user_article (
	id serial,
	user_id INTEGER,
	article_id INTEGER,
	db_created_on TIMESTAMP,
	db_updated_on TIMESTAMP,
	PRIMARY KEY(id)
);
