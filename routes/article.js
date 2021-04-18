const express = require('express');
const router = express.Router();
const dbman = require("../utils/dbman");
const {securityCheck} = require("./base");


router.get('/fetch', function (req, res) {
    securityCheck(req, res, (accessToken) => {
        dbman.fetchPublications(null).then(publications => {
            return res.json({status: 200, publications: publications});
        }).catch(console.log);
    })
});
router.post('/view', function (req, res) {
    securityCheck(req, res, (accessToken) => {
        let publicationId = req.body.id;
        dbman.fetchPublications(publicationId).then(publications => {
            return res.json({status: 200, publications: publications});
        }).catch(console.log);
    })
});

router.post('/toggleApproval', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        let id = req.body.id;
        dbman.toggleApproval(id).then(updatedApproval => {
            return res.json({status: 200, message: 'Publication ' + id + ' toggled to: ' + updatedApproval});
        }).catch(console.log);
    })
});

router.post('/deletePublication', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        dbman.deletePublication(req.body.publicationId).then(deletedPub => {
            if (deletedPub) {
                res.json({status: 200, message: 'Publication deleted'});
            }
        }).catch(console.log)
    })
});
router.post('/fetchAllPublicationAsDivision', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        dbman.fetchAllPublicationAsDivision(req.body.divisionName).then(pubId => {
            if (pubId) {
                res.json({status: 200, pubId: pubId});
            }
        }).catch(console.log)
    })
});
router.post('/add', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        let databaseId = req.body.databaseId;
        let type = req.body.type;
        let title = req.body.title;
        let abstract = req.body.publicationAbstract;
        let creators = req.body.creators;
        let corporateCreators = req.body.corporateCreators;
        let divisions = req.body.divisions;
        let status = req.body.selectedStatus;
        let kind = req.body.kind;
        let selectedRefereed = req.body.selectedRefereed;
        let firstPage = req.body.bookSectionFirstPage;
        let endPage = req.body.bookSectionEndPage;
        let bookSectionTitle = req.body.bookSectionTitle;
        let publicationPlace = req.body.bookSectionPublicationPlace;
        let publisher = req.body.bookSectionPublisher;
        let publicationDepartment = req.body.publicationDepartment;
        let pageNumber = req.body.bookSectionPageNumber;
        let seriesName = req.body.bookSectionSeriesName;
        let bookSectionISBN = req.body.bookSectionISBN;
        let volume = req.body.bookSectionVolume;
        let number = req.body.bookSectionNumber;
        let subjects = req.body.subjects;
        let editors = req.body.editors;
        let dateType = req.body.selectedDateType;
        let date = req.body.selectedDate;
        let publicationId = req.body.publicationId;
        let publicationURL = req.body.publicationURL;
        let relatedURLs = req.body.relatedURLs;
        let funders = req.body.funders;
        let projects = req.body.projects;
        let emailAddress = req.body.emailAddress;
        let references = req.body.references;
        let unKeyword = req.body.unKeyword;
        let addInformation = req.body.addInformation;
        let comment = req.body.comment;
        let monographType = req.body.monographType;
        let presentationType = req.body.presentationType;
        let thesisType = req.body.thesisType;
        let institution = req.body.institution;
        let patentApplicant = req.body.patentApplicant;
        let mediaOutput = req.body.mediaOutput;
        let copyrightHolder = req.body.copyrightHolder;
        dbman.insertNewPublication(type, title, abstract, monographType, presentationType, thesisType, institution, creators, corporateCreators, divisions, status, kind, patentApplicant,
            mediaOutput, copyrightHolder, selectedRefereed,
            firstPage, endPage, bookSectionTitle, publicationPlace, publisher, publicationDepartment,
            pageNumber, seriesName, bookSectionISBN, volume, number,
            subjects, editors, dateType, date, publicationId, publicationURL, relatedURLs, funders, projects,
            emailAddress, references, unKeyword, addInformation, comment,false, databaseId).then(pubId => {
            return res.json({status: 200, message: 'Successfully added publication:' + pubId.toString()});
        }).catch(console.log);
    })
});

module.exports = router;