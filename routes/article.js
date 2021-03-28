const configs = require('../utils/configs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbman = require("../utils/dbman");

router.post('/fetch', function (req, res) {
    let accessToken = req.body['accessToken'];
    if (accessToken === null) return res.json({status: 1, message: 'Missing access token.'});
    jwt.verify(accessToken, configs.SECRET, function (err, decoded) {
        if (err) {
            console.error(err);
            if (err.message === 'invalid signature')
                return res.json({status: 401, message: 'Invalid signature. Please try again.'});
            if (err.message === 'jwt expired')
                return res.json({status: 401, message: 'Access token expired. Please login again.'});
            return res.json({status: 401, message: 'Error: ' + err.message});
        } else {
            setTimeout(() => {
                dbman.fetchPublications(null).then(publications => {
                    return res.json({status: 200, publications: publications});
                }).catch(console.log);
            }, 2000);
        }
    });
});
router.post('/view',function (req,res){
    let publicationId = req.body.id;
    let accessToken = req.body['accessToken'];
    if (accessToken === null) return res.json({status: 1, message: 'Missing access token.'});
    jwt.verify(accessToken, configs.SECRET, function (err, decoded) {
        if (err) {
            console.error(err);
            if (err.message === 'invalid signature')
                return res.json({status: 401, message: 'Invalid signature. Please try again.'});
            if (err.message === 'jwt expired')
                return res.json({status: 401, message: 'Access token expired. Please login again.'});
            return res.json({status: 401, message: 'Error: ' + err.message});
        } else {
            setTimeout(() => {
                dbman.fetchPublications(publicationId).then(publications => {
                    return res.json({status: 200, publications: publications});
                }).catch(console.log);
            }, 2000);
        }
    });
});
router.post('/toggleApproval', (req, res) => {
    let id = req.body.id;
    setTimeout(() => {
        dbman.toggleApproval(id).then(updatedApproval => {
            return res.json({status: 200, message: 'Publication ' + id + ' toggled to: ' + updatedApproval});
        }).catch(console.log);
    }, 2000);
});


router.post('/add', (req, res) => {
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
    setTimeout(() => {
        dbman.insertNewPublication(type, title, abstract, monographType, presentationType, thesisType, institution, creators, corporateCreators, divisions, status,kind, patentApplicant,
            mediaOutput, copyrightHolder, selectedRefereed,
            firstPage, endPage, bookSectionTitle, publicationPlace, publisher,publicationDepartment,
            pageNumber, seriesName, bookSectionISBN, volume, number,
            subjects, editors, dateType, date, publicationId, publicationURL, relatedURLs, funders, projects,
            emailAddress, references, unKeyword, addInformation, comment, databaseId).then(pubId => {
            return res.json({status: 200, message: 'Successfully added publication:' + pubId.toString()});
        }).catch(console.log);
    }, 2000);
});

module.exports = router;
