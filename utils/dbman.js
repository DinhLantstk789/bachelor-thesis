const seq = require('sequelize');
const {QueryTypes} = require('sequelize');
const dbConfigs = {
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {socketPath: '/tmp/.s.PGSQL.5432'}
};
const eprints = new seq.Sequelize('eprints', 'postgres', null, dbConfigs);


module.exports = {
    insertNewPublication: async (type, title, abstract, creators, corporateCreators, divisions, selectedStatus, selectedRefereed,
                                 bookSectionFirstPage, bookSectionEndPage, bookSectionTitle, bookSectionPublicationPlace, bookSectionPublisher,
                                 bookSectionPageNumber, bookSectionSeriesName, bookSectionISBN, bookSectionVolume, bookSectionNumber,
                                 subjects, editors, selectedDateType, selectedDate, publicationId, publicationURL, relatedURLs, funders, projects,
                                 emailAddress, references, unKeyword, addInformation, comment) => {
        //let normalisedRelatedURLs = relatedURLs.map(rl => ({url: rl.URL, url_type: rl.URLType}));
        let normalisedRelatedURLs = [];
        const pubId = await eprints.query(
            'INSERT INTO TABLE publication (item_type, title, abstract, corporateCreators, divisions, is_refereed, status, publication_title, issn_isbn, publisher, official_url,' +
            ' volume, place_of_publication, number_of_pages, number, page_range, date, date_type, identification_number, series_name, related_urls, funders, projects, ' +
            'contact_email_address, reference, uncontrolled_keywords, additional_infor, comments_and_suggestions, subjects)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING id;', {
                bind: [type, title, abstract, corporateCreators, divisions, selectedRefereed === 'yes', selectedStatus, bookSectionTitle, bookSectionISBN, bookSectionPublisher,
                    publicationURL, parseInt(bookSectionVolume), bookSectionPublicationPlace, parseInt(bookSectionPageNumber), parseInt(bookSectionNumber), [parseInt(bookSectionFirstPage),
                        parseInt(bookSectionEndPage)], selectedDate, selectedDateType, publicationId, bookSectionSeriesName, normalisedRelatedURLs, funders, projects, emailAddress, references, unKeyword,
                    addInformation, comment, subjects],
                type: QueryTypes.INSERT
            }
        );
        // insert creator. insert editors
        console.log(pubId);
    }
}
