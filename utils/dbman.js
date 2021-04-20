const seq = require('sequelize');
const {QueryTypes} = require("sequelize");
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

/* replace existing  division */
async function insertUserDivision(userEmail, divisionName) {
    await eprints.query('DELETE FROM user_division WHERE user_email = $1;', {bind: [userEmail], type: QueryTypes.DELETE});
    await eprints.query('INSERT INTO user_division (user_email, division_name) VALUES ($1, $2) ON CONFLICT (user_email, division_name) DO NOTHING RETURNING user_email;', {bind: [userEmail, divisionName], type: QueryTypes.INSERT});
}

async function insertDivision(divisionName) {
    await eprints.query('INSERT INTO division (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING name;', {bind: [divisionName], type: QueryTypes.INSERT});
}


async function insertCreatorOrEditor(publication_id, user, authorOrder, linked_table) {
    let isApproved = await eprints.query('SELECT is_approved FROM users WHERE email = $1;', {bind: [user.email], type: QueryTypes.SELECT});
    let onConflict = (isApproved.length === 0 || isApproved[0].is_approved) ? 'NOTHING ' : 'UPDATE SET family_name = $2, given_name = $3'
    await eprints.query(
        'INSERT INTO users (email, family_name, given_name)' +
        'VALUES ($1, $2, $3) ON CONFLICT (email) DO ' +
        onConflict + 'RETURNING email;', {bind: [user.email, user.familyName, user.givenName], type: QueryTypes.INSERT}
    );
    let q = 'insert into publication_creator (publication_id, creator_email, author_order) values ($1, $2, $3) returning creator_email';
    let bind = [publication_id, user.email, authorOrder];
    if (linked_table === 'editor') {
        q = 'insert into publication_editor (publication_id, editor_email) values ($1, $2) returning editor_email';
        bind = [publication_id, user.email];
    }
    await insertDivision(user.department);
    await eprints.query(q, {bind: bind, type: QueryTypes.INSERT});
    await insertUserDivision(user.email, user.department);
}

async function getDivisionOfUser(email) {
    const r = await eprints.query('SELECT division_name from user_division where user_email = $1;', {bind: [email], type: QueryTypes.SELECT});
    return r[0].division_name;
}

async function insertDivision(division) {
    await eprints.query('INSERT INTO divisions (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING name;', {bind: [division], type: QueryTypes.INSERT});
}


async function insertPublicationDivision(publication_id, division) {
    await eprints.query('DELETE FROM publication_division WHERE publication_id = $1;', {bind: [publication_id], type: QueryTypes.DELETE});
    await eprints.query('INSERT INTO publication_division (publication_id, division_name) VALUES ($1, $2) RETURNING publication_id;', {bind: [publication_id, division], type: QueryTypes.INSERT});
}

module.exports = {
    toggleApproval: async (publicationId) => {
        let isApproved = await eprints.query('SELECT is_approved FROM publication WHERE id = $1;', {bind: [publicationId], type: QueryTypes.SELECT});
        isApproved = isApproved[0].is_approved;
        let updatedApproval = await eprints.query(
            'UPDATE publication SET is_approved = $1 WHERE id = $2 RETURNING is_approved;', {bind: [!isApproved, publicationId], type: QueryTypes.UPDATE}
        );
        return updatedApproval[0][0].is_approved;
    },
    /* if filteringConfigs === null, no filter*/
    /* if userEmail === null --> isAdmin, so fetch all without user filter
    *  publicationId === null --> get all possbile publications. else: get a targeted publication */
    fetchPublications: async (filteringConfigs, publicationId, userEmail, isAdmin) => {
        let filteringCondition = 'WHERE true ';
        /* filterin by user divisions permission */
        const divs = await eprints.query('SELECT division_name FROM user_division WHERE user_email = $1', {bind: [userEmail], type: QueryTypes.SELECT});
        let filteredDivisions = divs.map(d => d.division_name);
        /* filtering by inputted division */
        let filterdPublicationIdsByDivision = null; /* null if have no filtered id */
        if (filteringConfigs !== null && filteringConfigs.isFiltering) {
            const filteringConfigsDivision = filteringConfigs.filteredDivisions.filter(v => v.isEnable).map(d => d.name);
            filteredDivisions = filteredDivisions.filter(value => filteringConfigsDivision.includes(value));
            filteringCondition = 'WHERE date_part(\'year\', date) >= ' + filteringConfigs.filteredYearFrom + ' and date_part(\'year\', date) <= ' + filteringConfigs.filteredYearTo + ' ';
        }
        let r = [];
        if (filteredDivisions.length > 0) {
            r = await eprints.query('SELECT distinct(publication_id) FROM publication_division WHERE division_name IN (:divisionNames);', {replacements: {divisionNames: filteredDivisions}, type: QueryTypes.SELECT});
        }
        filterdPublicationIdsByDivision = r.map(r => r.publication_id);

        /* filtering by users and publication ID */
        let finalFilter = [];
        let filter = filteringCondition + 'AND id IN (:pubIds)';
        if (!isAdmin) {
            let authorisedPublicationIDs = await eprints.query('select publication_id from publication_creator where creator_email = $1', {bind: [userEmail], type: QueryTypes.SELECT});
            authorisedPublicationIDs.forEach(ap => {
                if (filterdPublicationIdsByDivision != null) {
                    if (filterdPublicationIdsByDivision.includes(ap.publication_id)) {
                        finalFilter.push(ap.publication_id);
                    }
                } else {
                    finalFilter.push(ap.publication_id);
                }
            });
            if (publicationId !== null) {
                if (filterdPublicationIdsByDivision != null) {
                    if (filterdPublicationIdsByDivision.includes(publicationId)) {
                        finalFilter = finalFilter.includes(publicationId) ? [publicationId] : [];
                    }
                } else {
                    finalFilter = finalFilter.includes(publicationId) ? [publicationId] : [];
                }
            }
        } else {
            if (publicationId !== null) {
                if (filterdPublicationIdsByDivision != null) {
                    if (filterdPublicationIdsByDivision.includes(publicationId)) {
                        finalFilter = [publicationId];
                    }
                } else {
                    finalFilter = [publicationId];
                }
            } else {
                finalFilter = filterdPublicationIdsByDivision;
            }
        }
        if (finalFilter.length === 0) filter = filteringCondition + 'AND false';

        let selectedFields = publicationId === null ? 'id, item_type, title, is_approved, date' : '*';
        let returnedResult = [];
        let selectedPublications = await eprints.query('SELECT ' + selectedFields + ' FROM publication ' + filter + ' ORDER BY db_created_on DESC;', {replacements: {pubIds: finalFilter}, type: QueryTypes.SELECT});
        for (const p of selectedPublications) {
            let creators = [];
            for (const e of await eprints.query('SELECT creator_email FROM publication_creator WHERE publication_id = $1 ORDER BY author_order;', {bind: [p.id], type: QueryTypes.SELECT})) {
                let resultCreators = await eprints.query('SELECT * FROM users WHERE email = $1;', {bind: [e.creator_email], type: QueryTypes.SELECT});
                for (const c of resultCreators) {
                    creators.push({
                        familyName: c.family_name,
                        givenName: c.given_name,
                        email: c.email,
                        department: await getDivisionOfUser(c.email)
                    });
                }
            }
            if (publicationId === null) {
                returnedResult.push({
                    id: p.id,
                    type: p.item_type,
                    title: p.title,
                    creators: creators,
                    isApproved: p.is_approved,
                    selectedDate: p.date
                })
            } else {
                let editors = [];
                for (const e of await eprints.query('SELECT editor_email FROM publication_editor WHERE publication_id = $1 ORDER BY db_created_on;', {bind: [p.id], type: QueryTypes.SELECT})) {
                    let resultEditors = await eprints.query('SELECT * FROM users WHERE email = $1;', {bind: [e.editor_email], type: QueryTypes.SELECT});
                    resultEditors.forEach(e => editors.push({
                        familyName: e.family_name,
                        givenName: e.given_name,
                        email: e.email
                    }));
                }

                let finalDivisions = await eprints.query('SELECT division_name FROM publication_division WHERE publication_id =$1;', {bind: [p.id], type: QueryTypes.SELECT})
                returnedResult.push({
                    id: p.id,
                    type: p.item_type,
                    title: p.title,
                    publicationAbstract: p.abstract,
                    creators: creators,
                    corporateCreators: p.corporate_creators,
                    divisions: finalDivisions.map(d => d.division_name),
                    selectedStatus: p.status,
                    kind: p.kind,
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
                    publicationDepartment: p.publication_department,
                    isApproved: p.is_approved
                })
            }
        }
        return returnedResult;
    },
    deletePublication: async (publication_id) => {
        try {
            await eprints.query('DELETE FROM publication_creator WHERE publication_id = $1', {bind: [publication_id], type: QueryTypes.DELETE});
            await eprints.query('DELETE FROM publication_editor WHERE publication_id = $1', {bind: [publication_id], type: QueryTypes.DELETE});
            await eprints.query('DELETE FROM publication_division WHERE publication_id = $1', {bind: [publication_id], type: QueryTypes.DELETE});
            await eprints.query('DELETE FROM publication WHERE id = $1', {bind: [publication_id], type: QueryTypes.DELETE});
            return {message: 'Publication is deleted'};
        } catch (e) {
            throw new Error(e);
        }
    },
    insertNewPublication: async (type, title, abstract, monographType, presentationType, thesisType, institution, creators, corporateCreators, divisions,
                                 status, kind, patentApplicant, mediaOutput, copyrightHolder, referred,
                                 firstPage, endPage, bookSectionTitle, publicationPlace, publisher, publicationDepartment,
                                 pageNumber, seriesName, isbn, volume, number,
                                 subjects, editors, dateType, date, publicationId, publicationURL, relatedURLs, funders, projects,
                                 emailAddress, references, unKeyword, addInformation, comment,isApproved, databaseId) => {
        console.log(type, title, abstract, monographType, presentationType, thesisType, institution, creators, corporateCreators, divisions,
            status, kind, patentApplicant, mediaOutput, copyrightHolder, referred,
            firstPage, endPage, bookSectionTitle, publicationPlace, publisher, publicationDepartment,
            pageNumber, seriesName, isbn, volume, number,
            subjects, editors, dateType, date, publicationId, publicationURL, relatedURLs, funders, projects,
            emailAddress, references, unKeyword, addInformation, comment, databaseId);
        let finalRelatedURLs = '';
        relatedURLs.forEach(i => finalRelatedURLs += ('("' + i.URL + '","' + i.URLType + '")' + ','))
        finalRelatedURLs = '{' + finalRelatedURLs.substring(0, finalRelatedURLs.length - 1) + '}';
        finalRelatedURLs = '{}'; // TODO: fixxxx please

        let finalCorporateCreators = convertToSQLArray(corporateCreators);
        let finalFunders = convertToSQLArray(funders);
        let finalProjects = convertToSQLArray(projects);
        let finalSubjects = convertToSQLArray(subjects);
        let pubId;
        if (databaseId !== undefined && databaseId !== null) {
            await eprints.query('DELETE FROM publication_creator WHERE publication_id = $1;', {bind: [databaseId], type: QueryTypes.DELETE});
            await eprints.query('DELETE FROM publication_editor WHERE publication_id = $1;', {bind: [databaseId], type: QueryTypes.DELETE});
            pubId = await eprints.query(
                'UPDATE publication SET item_type = $1,title = $2,abstract = $3,monograph_type = $4,presentation_type = $5,thesis_type = $6,institution = $7,corporate_creators = $8,' +
                'is_refereed = $9,status = $10, kind = $11,patent_applicant = $12,media_output = $13,copyright_holder = $14, publication_title = $15, ' +
                'issn_isbn = $16, publisher = $17,publication_department = $18, official_url = $19,' +
                'volume = $20, place_of_publication = $21, number_of_pages = $22, number = $23, page_range = $24, date = $25, date_type = $26, identification_number = $27,' +
                ' series_name = $28, related_urls = $29, funders = $30, projects = $31,' +
                'contact_email_address = $32, reference = $33, uncontrolled_keywords = $34, additional_infor = $35, comments_and_suggestions = $36, subjects = $37, is_approved = $38 WHERE id = $39 RETURNING id', {
                    bind: [type, title, abstract, monographType, presentationType, thesisType, institution, finalCorporateCreators, referred === 'yes',
                        status, kind, patentApplicant, mediaOutput, copyrightHolder, bookSectionTitle, isbn, publisher, publicationDepartment,
                        publicationURL, parseInt(volume), publicationPlace, parseInt(pageNumber), parseInt(number),
                        '{' + firstPage + ',' + endPage + '}', date, dateType, publicationId, seriesName,
                        finalRelatedURLs, finalFunders, finalProjects, emailAddress, references, unKeyword,
                        addInformation, comment, finalSubjects, isApproved,databaseId]
                    , type: QueryTypes.UPDATE
                }
            );
        } else {
            pubId = await eprints.query(
                'INSERT INTO publication (item_type, title, abstract, monograph_type, presentation_type, thesis_type,institution, corporate_creators, ' +
                ' is_refereed, status,kind,patent_applicant,media_output,copyright_holder, publication_title, issn_isbn, publisher,publication_department, official_url,' +
                ' volume, place_of_publication, number_of_pages, number, page_range, date, date_type, identification_number, series_name, related_urls, funders, projects, ' +
                'contact_email_address, reference, uncontrolled_keywords, additional_infor, comments_and_suggestions, subjects)' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29,$30,$31,$32,$33,$34,$35,$36,$37) ' +
                'RETURNING id;', {
                    bind: [type, title, abstract, monographType, presentationType, thesisType, institution, finalCorporateCreators, referred === 'yes',
                        status, kind, patentApplicant, mediaOutput, copyrightHolder, bookSectionTitle, isbn, publisher, publicationDepartment,
                        publicationURL, parseInt(volume), publicationPlace, parseInt(pageNumber), parseInt(number),
                        '{' + firstPage + ',' + endPage + '}', date, dateType, publicationId, seriesName,
                        finalRelatedURLs, finalFunders, finalProjects, emailAddress, references, unKeyword,
                        addInformation, comment, finalSubjects]
                    , type: QueryTypes.INSERT
                }
            );
        }
        divisions.forEach(d => {
            insertDivision(d);
            insertPublicationDivision(pubId[0][0].id, d);
        });
        let authorOrder = 0;
        creators.forEach(user => {
            insertCreatorOrEditor(pubId[0][0].id, user, authorOrder, 'creator');
            authorOrder += 1
        });
        editors.forEach(user => {
            user.department = '';
            insertCreatorOrEditor(pubId[0][0].id, user, null, 'editor')
        });
        return pubId[0][0].id;
    },
    fetchAllPublicationAsDivision: async (divisionName) => {
        let pubId = await eprints.query('SELECT publication_id FROM publication_division WHERE division_name LIKE $1', {bind: [divisionName], type: QueryTypes.SELECT});
        let returnedResult = [];
        for (const p of pubId) {
            returnedResult.push({
                id: p.publication_id
            })
        }
        return returnedResult;
    },
    insertUser: async (email, familyName, givenName, password, department, address, isAdmin, description, registrationDate, isApproved) => {
        let addedUser = await eprints.query(
            'INSERT INTO users(email, family_name, given_name, password, address, is_admin, description, registration_date, is_approved)' +
            'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT(email) DO UPDATE SET family_name = $2, given_name = $3, password = $4, address = $5 , is_admin = $6,' +
            ' description = $7, registration_date = $8, is_approved = $9 ' + 'RETURNING email;', {
                bind: [email, familyName, givenName, password, address, isAdmin, description, registrationDate, isApproved],
                type: QueryTypes.INSERT
            }
        );
        await insertUserDivision(email, department);
        return addedUser[0][0].email;
    },
    /* email === null -> fetch all, otherwise, indicates a specific user */
    /* loggedUserEmail is the ID of admin requesting */
    fetchUserInformation: async (email, loggedUserEmail) => {
        const divisions = await eprints.query('SELECT division_name FROM user_division WHERE user_email = $1', {bind: [loggedUserEmail], type: QueryTypes.SELECT});
        const divisionNames = divisions.map(d => d.division_name);
        let userEmailsInTheDivision = await eprints.query('SELECT user_email FROM user_division WHERE division_name IN(:divisionNames)', {replacements: {divisionNames: divisionNames}, type: QueryTypes.SELECT});

        let filter = 'WHERE is_approved = true ' + (email === null ? '' : ('AND email = :specifiedEmail')) + ' AND email in (:userEmailsInTheDivision)';
        let selectedFields = email === null ? 'given_name, family_name, email, is_admin' : '*';
        let returnedResult = [];
        let selectedUsers = await eprints.query('SELECT ' + selectedFields + ' FROM users ' + filter + ' ORDER BY db_created_on DESC;',
            {replacements: {userEmailsInTheDivision: userEmailsInTheDivision.map(ue => ue.user_email), specifiedEmail: email}, type: QueryTypes.SELECT});
        for (const u of selectedUsers) {
            if (email === null || email === undefined) {
                returnedResult.push({
                    email: u.email,
                    givenName: u.given_name,
                    familyName: u.family_name,
                    isAdmin: u.is_admin,
                    department: await getDivisionOfUser(u.email)
                })
            } else {
                returnedResult.push({
                    email: u.email,
                    givenName: u.given_name,
                    familyName: u.family_name,
                    isAdmin: u.is_admin,
                    address: u.address,
                    department: await getDivisionOfUser(u.email),
                    isAdmin: u.is_admin,
                    userDescription: u.description
                });
            }
        }
        return returnedResult;
    },
    deleteUser: async (email) => {
        try {
            await eprints.query('DELETE FROM user_division WHERE user_email = $1', {bind: [email], type: QueryTypes.DELETE});
            await eprints.query('DELETE FROM users WHERE email = $1', {bind: [email], type: QueryTypes.DELETE});
            return {message: 'User is deleted'};
        } catch (e) {
            throw new Error(e);
        }
    },
    findUser: async (email) => {
        let users = await eprints.query('SELECT email, password, family_name, given_name, is_admin FROM users WHERE email = $1', {bind: [email], type: QueryTypes.SELECT});
        if (users.length !== 1) return null;
        const loggedUser = users[0];
        const uEmail = loggedUser.email;
        let divisions = await eprints.query('SELECT division_name FROM user_division WHERE user_email = $1', {bind: [uEmail], type: QueryTypes.SELECT});
        loggedUser.divisions = divisions.map(d => d.division_name);
        return loggedUser;
    }
}
