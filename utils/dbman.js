const seq = require('sequelize');
const {QueryTypes} = require('sequelize');
const dbConfigs = {
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {socketPath: '/tmp/.s.PGSQL.5432'}
};
const eprints = new seq.Sequelize('eprints', 'postgres', null, dbConfigs);

function convertToSQLArray(arr) {
    let r = '';
    arr.forEach(i => r += ('"' + i + '"' + ','));
    return '{' + r.substring(0, r.length - 1) + '}';
}

async function insertEditor(publication_id, e) {
    let isApproved = await eprints.query('SELECT is_approved FROM users WHERE email = $1;', {bind: [e.email], type: QueryTypes.SELECT});
    let onConflict = (isApproved.length === 0 || isApproved[0].is_approved) ? 'NOTHING ' : 'UPDATE SET family_name = $2, given_name = $3 '
    await eprints.query(
        'INSERT INTO users (email, family_name, given_name)' +
        'VALUES ($1, $2, $3) ' +
        'ON CONFLICT (email) DO ' +
        onConflict + 'RETURNING email;', {
            bind: [e.email, e.familyName, e.givenName],
            type: QueryTypes.INSERT
        }
    );
    await eprints.query(
        'INSERT INTO publication_editor (publication_id, editor_email)' +
        'VALUES ($1, $2) ' +
        'RETURNING editor_email;', {
            bind: [publication_id, e.email],
            type: QueryTypes.INSERT
        }
    );
}

async function insertCreator(publication_id, c) {
    let isApproved = await eprints.query('SELECT is_approved FROM users WHERE email = $1;', {bind: [c.email], type: QueryTypes.SELECT});
    let onConflict = (isApproved.length === 0 || isApproved[0].is_approved) ? 'NOTHING ' : 'UPDATE SET family_name = $2, given_name = $3, department = $4 '
    await eprints.query(
        'INSERT INTO users (email, family_name, given_name, department)' +
        'VALUES ($1, $2, $3, $4) ' +
        'ON CONFLICT (email) DO ' +
        onConflict + 'RETURNING email;', {
            bind: [c.email, c.familyName, c.givenName, c.department],
            type: QueryTypes.INSERT
        }
    );
    await eprints.query(
        'INSERT INTO publication_creator (publication_id, creator_email)' +
        'VALUES ($1, $2) ' +
        'RETURNING creator_email;', {
            bind: [publication_id, c.email],
            type: QueryTypes.INSERT
        }
    );
}


module.exports = {
    fetchAllPublications: async () => {
        let publications = eprints.query('SELECT id, item_type, title, is_approved  FROM publication;', {bind: [], type: QueryTypes.SELECT});
    },
    insertNewPublication: async (type, title, abstract, creators, corporateCreators, divisions, selectedStatus, selectedRefereed,
                                 firstPage, endPage, bookSectionTitle, bookSectionPublicationPlace, bookSectionPublisher,
                                 bookSectionPageNumber, bookSectionSeriesName, bookSectionISBN, bookSectionVolume, bookSectionNumber,
                                 subjects, editors, selectedDateType, selectedDate, publicationId, publicationURL, relatedURLs, funders, projects,
                                 emailAddress, references, unKeyword, addInformation, comment) => {
        let finalRelatedURLs = '';
        relatedURLs.forEach(i => finalRelatedURLs += ('("' + i.URL + '","' + i.URLType + '")' + ','))
        finalRelatedURLs = '{' + finalRelatedURLs.substring(0, finalRelatedURLs.length - 1) + '}';
        finalRelatedURLs = '{}'; // TODO: fixxxx please

        let finalCorporateCreators = convertToSQLArray(corporateCreators);
        let finalDivision = convertToSQLArray(divisions);
        let finalFunders = convertToSQLArray(funders);
        let finalProjects = convertToSQLArray(projects);
        let finalSubjects = convertToSQLArray(subjects);

        var publicationId = await eprints.query(
            'INSERT INTO publication (item_type, title, abstract, corporate_creators, divisions, is_refereed, status, publication_title, issn_isbn, publisher, official_url,' +
            ' volume, place_of_publication, number_of_pages, number, page_range, date, date_type, identification_number, series_name, related_urls, funders, projects, ' +
            'contact_email_address, reference, uncontrolled_keywords, additional_infor, comments_and_suggestions, subjects)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING id;', {
                bind: [type, title, abstract, finalCorporateCreators, finalDivision, selectedRefereed === 'yes', selectedStatus, bookSectionTitle, bookSectionISBN, bookSectionPublisher,
                    publicationURL, parseInt(bookSectionVolume), bookSectionPublicationPlace, parseInt(bookSectionPageNumber), parseInt(bookSectionNumber),
                    '{' + firstPage + ',' + endPage + '}', selectedDate, selectedDateType, publicationId, bookSectionSeriesName,
                    finalRelatedURLs, finalFunders, finalProjects, emailAddress, references, unKeyword,
                    addInformation, comment, finalSubjects],
                type: QueryTypes.INSERT
            }
        );
        console.log(publicationId[0][0].id);
        creators.forEach(c => insertCreator(publicationId[0][0].id, c));
        editors.forEach(e => insertEditor(publicationId[0][0].id, e));
    }
}
