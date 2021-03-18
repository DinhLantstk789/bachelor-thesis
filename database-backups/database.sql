CREATE TABLE users (
	email TEXT NOT NULL,
    family_name TEXT,
    given_name TEXT,
	hide_email BOOLEAN NOT NULL DEFAULT TRUE,
	password TEXT NOT NULL,
	department TEXT NOT NULL,
	address TEXT,
	isAdmin BOOLEAN DEFAULT FALSE,
	registration_date TIMESTAMP NOT NULL DEFAULT NOW(),
	last_login TIMESTAMP,
	is_approved BOOLEAN DEFAULT FALSE,
	can_login BOOLEAN DEFAULT FALSE,
	db_created_on TIMESTAMP,
	db_updated_on TIMESTAMP,
	PRIMARY KEY(email)
);

CREATE TYPE related_url AS (url TEXT, url_type TEXT);

CREATE TABLE publication (
	id serial,
	item_type TEXT,
	title TEXT NOT NULL,
	abstract TEXT,
	corporate_creators TEXT[],
    divisions TEXT[],
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
    subjects TEXT[],
	is_approved BOOLEAN DEFAULT FALSE,
	db_created_on TIMESTAMP,
	db_updated_on TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE publication_creator (
    publication_id INTEGER,
    creator_email  TEXT,
    db_created_on  TIMESTAMP,
    db_updated_on  TIMESTAMP,
    FOREIGN KEY (publication_id) REFERENCES publication (id),
    FOREIGN KEY (creator_email) REFERENCES users (email),
    PRIMARY KEY (publication_id, creator_email)
);

CREATE TABLE publication_editor (
    publication_id INTEGER,
    editor_email   TEXT,
    db_created_on  TIMESTAMP,
    db_updated_on  TIMESTAMP,
    FOREIGN KEY (publication_id) REFERENCES publication (id),
    FOREIGN KEY (editor_email) REFERENCES users (email),
    PRIMARY KEY (publication_id, editor_email)
);