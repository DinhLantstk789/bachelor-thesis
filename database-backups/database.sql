CREATE TABLE users (
	email TEXT NOT NULL,
    family_name TEXT,
    given_name TEXT,
	hide_email BOOLEAN NOT NULL DEFAULT TRUE,
	password TEXT DEFAULT NULL,
	department TEXT DEFAULT NULL,
	address TEXT DEFAULT NULL,
	isAdmin BOOLEAN DEFAULT FALSE,
	registration_date TIMESTAMP DEFAULT NULL,
	last_login TIMESTAMP DEFAULT NULL,
	is_approved BOOLEAN DEFAULT FALSE,
	can_login BOOLEAN DEFAULT FALSE,
	db_created_on TIMESTAMP DEFAULT NOW(),
	db_updated_on TIMESTAMP DEFAULT NOW(),
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
	institution TEXT DEFAULT NULL,
	publication_department TEXT DEFAULT NULL,
    presentation_type TEXT DEFAULT NULL,
    monograph_type TEXT DEFAULT NULL,
    thesis_type TEXT DEFAULT NULL,
	issn_isbn TEXT,
	publisher TEXT,
	official_url TEXT,
	volume INTEGER,
	place_of_publication TEXT,
	number_of_pages INTEGER DEFAULT NULL,
    patent_applicant TEXT DEFAULT NULL,
    media_output TEXT DEFAULT NULL,
    copyright_holder TEXT DEFAULT NULL,
	number INTEGER,
	page_range INTEGER[2],
	date TIMESTAMP,
	date_type TEXT,
	identification_number TEXT,
	series_name TEXT DEFAULT NULL,
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
	db_created_on TIMESTAMP DEFAULT NOW(),
	db_updated_on TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (id)
);

CREATE TABLE publication_creator (
    publication_id INTEGER,
    creator_email  TEXT,
    db_created_on  TIMESTAMP DEFAULT NOW(),
    db_updated_on  TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (publication_id) REFERENCES publication (id),
    FOREIGN KEY (creator_email) REFERENCES users (email),
    PRIMARY KEY (publication_id, creator_email)
);

CREATE TABLE publication_editor (
    publication_id INTEGER,
    editor_email TEXT,
    db_created_on TIMESTAMP DEFAULT NOW(),
    db_updated_on TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (publication_id) REFERENCES publication (id),
    FOREIGN KEY (editor_email) REFERENCES users (email),
    PRIMARY KEY (publication_id, editor_email)
);