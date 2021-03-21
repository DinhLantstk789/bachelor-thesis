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
        'INSERT INTO publication_' + linked_table + ' (publication_id, ' + linked_table + '_email)' +
        'VALUES ($1, $2) RETURNING ' + linked_table + '_email;', {
            bind: [publication_id, user.email],
            type: QueryTypes.INSERT
        }
    );
}

module.exports = {
    fetchPublications: async (publicationId) => {
        let filter = publicationId === null ? '' : ('WHERE publication_id = $1');
        let selectedFields = publicationId === null ? 'id, item_type, title, is_approved' : '*';
        let returnedResult = [];
        let selectedPublications = await eprints.query('SELECT ' + selectedFields + ' FROM publication ' + filter + ' ORDER BY db_created_on DESC;', {
            bind: publicationId === null ? [] : [publicationId],
            type: QueryTypes.SELECT
        });
        for (const p of selectedPublications) {
            let creators = [];
            for (const e of await eprints.query('SELECT creator_email FROM publication_creator WHERE publication_id = $1;', {bind: [p.id], type: QueryTypes.SELECT})) {
                let resultCreators = await eprints.query('SELECT * FROM users WHERE email = $1;', {bind: [e.creator_email], type: QueryTypes.SELECT});
                resultCreators.forEach(c => {
                    creators.push({
                        familyName: c.family_name,
                        givenName: c.given_name,
                        email: c.email,
                        department: c.department,
                    });
                });
            }
            if (publicationId === null) {
                returnedResult.push({
                    id: p.id,
                    type: p.item_type,
                    title: p.title,
                    creators: creators,
                    isApproved: p.is_approved
                })
            } else {
                let editors = [];
                for (const e of await eprints.query('SELECT editor_email FROM publication_editor WHERE publication_id = $1;', {bind: [p.id], type: QueryTypes.SELECT})) {
                    let resultEditors = await eprints.query('SELECT * FROM users WHERE email = $1;', {bind: [e.editor_email], type: QueryTypes.SELECT});
                    resultEditors.forEach(e => editors.push({
                        familyName: e.family_name,
                        givenName: e.given_name,
                        email: e.email
                    }));
                }
                returnedResult.push({
                    id: p.id,
                    type: p.item_type,
                    title: p.title,
                    publicationAbstract: p.abstract,
                    creators: creators,
                    corporateCreators: p.corporate_creators,
                    divisions: p.divisions,
                    selectedStatus: p.status,
                    selectedRefereed: p.is_refereed,
                    bookSectionFirstPage: p.page_range[0],
                    bookSectionEndPage: p.page_range[1],
                    bookSectionTitle: p.publication_title,
                    bookSectionPublicationPlace: p.place_of_publication,
                    bookSectionPublisher: p.publisher,
                    bookSectionPageNumber: p.number_of_pages,
                    bookSectionSeriesName: p.series_name,
                    bookSectionISBN: p.issn_isbn,
                    bookSectionVolume: p.volume,
                    bookSectionNumber: p.number,
                    subjects: p.subjects,
                    editors: editors,
                    selectedDateType: p.date_type,
                    selectedDate: p.date,
                    publicationId: p.identification_number,
                    publicationURL: p.official_url,
                    relatedURLs: [],
                    funders: p.funders,
                    projects: p.projects,
                    emailAddress: p.contact_email_address,
                    references: p.reference,
                    unKeyword: p.uncontrolled_keywords,
                    addInformation: p.additional_infor,
                    comment: p.comments_and_suggestions,
                    monographType: p.monograph_type,
                    presentationType: p.presentation_type,
                    thesisType: p.thesis_type,
                    institution: p.institution,
                    patentApplicant: p.patent_applicant,
                    mediaOutput: p.media_output,
                    copyrightHolder: p.copyright_holder,
                    publicationDepartment: p.publication_department
                })
            }
        }
        return returnedResult;
    },
    insertNewPublication: async (type, title, abstract, monographType, presentationType, thesisType, institution, creators, corporateCreators, divisions,
                                 status, patentApplicant, mediaOutput, copyrightHolder, referred,
                                 firstPage, endPage, bookSectionTitle, publicationPlace, publisher, publicationDepartment,
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

        var insertedPubId = await eprints.query(
            'INSERT INTO publication (item_type, title, abstract, monograph_type, presentation_type, thesis_type,institution, corporate_creators, ' +
            'divisions, is_refereed, status,patent_applicant,media_output,copyright_holder, publication_title, issn_isbn, publisher,publication_department, official_url,' +
            ' volume, place_of_publication, number_of_pages, number, page_range, date, date_type, identification_number, series_name, related_urls, funders, projects, ' +
            'contact_email_address, reference, uncontrolled_keywords, additional_infor, comments_and_suggestions, subjects)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29,$30,$31,$32,$33,$34,$35,$36,$37) RETURNING id;', {
                bind: [type, title, abstract, monographType, presentationType, thesisType, institution, finalCorporateCreators, finalDivision, referred === 'yes',
                    status, patentApplicant, mediaOutput, copyrightHolder, bookSectionTitle, isbn, publisher, publicationDepartment,
                    publicationURL, parseInt(volume), publicationPlace, parseInt(pageNumber), parseInt(number),
                    '{' + firstPage + ',' + endPage + '}', date, dateType, publicationId, seriesName,
                    finalRelatedURLs, finalFunders, finalProjects, emailAddress, references, unKeyword,
                    addInformation, comment, finalSubjects],
                type: QueryTypes.INSERT
            }
        );
        creators.forEach(user => insertCreatorEditor(insertedPubId[0][0].id, user, 'creator'));
        editors.forEach(user => {
            user.department = null;
            insertCreatorEditor(insertedPubId[0][0].id, user, 'editor')
        });
        return insertedPubId[0][0].id;
    }
}
