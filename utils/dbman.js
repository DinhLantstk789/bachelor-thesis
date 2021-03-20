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


async function insertCreatorEditor(publication_id, user, linked_table) {
    let isApproved = await eprints.query('SELECT is_approved FROM users WHERE email = $1;', {bind: [user.email], type: QueryTypes.SELECT});
    let onConflict = (isApproved.length === 0 || isApproved[0].is_approved) ? 'NOTHING ' : 'UPDATE SET family_name = $2, given_name = $3, department = $4 '
    await eprints.query(
        'INSERT INTO users (email, family_name, given_name, department)' +
        'VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO ' +
        onConflict + 'RETURNING email;', {
            bind: [user.email, user.familyName, user.givenName, user.department],
            type: QueryTypes.INSERT
        }
    );
    await eprints.query(
        'INSERT INTO publication_' + linked_table + ' (publication_id, creator_email)' +
        'VALUES ($1, $2) RETURNING ' + linked_table + '_email;', {
            bind: [publication_id, user.email],
            type: QueryTypes.INSERT
        }
    );
}


module.exports = {
    fetchAllPublications: async () => {
        let publications = [];
        let result = await eprints.query('SELECT id, item_type, title, is_approved  FROM publication;', {bind: [], type: QueryTypes.SELECT});
        for (const r of result) {
            let authors = [];
            let creatorEmailsResult = await eprints.query('SELECT creator_email FROM publication_creator WHERE publication_id = $1;', {bind: [r.id], type: QueryTypes.SELECT});
            for (const emailResult of creatorEmailsResult) {
                let creators = await eprints.query('SELECT given_name, family_name FROM users WHERE email = $1;', {bind: [emailResult.creator_email], type: QueryTypes.SELECT});
                creators.forEach(c => {
                    authors.push(c.given_name + ' ' + c.family_name)
                });
            }
            publications.push({
                id: r.id,
                type: r.item_type,
                title: r.title,
                authors: authors,
                isApproved: r.is_approved
            })
        }
        return publications;
    },
    insertNewPublication: async (type, title, abstract, creators, corporateCreators, divisions, status, referred,
                                 firstPage, endPage, bookSectionTitle, publicationPlace, publisher,
                                 pageNumber, seriesName, isbn, volume, number,
                                 subjects, editors, dateType, date, publicationId, publicationURL, relatedURLs, funders, projects,
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
                bind: [type, title, abstract, finalCorporateCreators, finalDivision, referred === 'yes', status, bookSectionTitle, isbn, publisher,
                    publicationURL, parseInt(volume), publicationPlace, parseInt(pageNumber), parseInt(number),
                    '{' + firstPage + ',' + endPage + '}', date, dateType, publicationId, seriesName,
                    finalRelatedURLs, finalFunders, finalProjects, emailAddress, references, unKeyword,
                    addInformation, comment, finalSubjects],
                type: QueryTypes.INSERT
            }
        );
        creators.forEach(user => insertCreatorEditor(publicationId[0][0].id, user, 'creator'));
        editors.forEach(user => {
            user.department = null;
            insertCreatorEditor(publicationId[0][0].id, user, 'editor')
        });
        return publicationId[0][0].id;
    }
}
