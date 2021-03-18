const configs = require('../utils/configs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbman = require("../utils/dbman");

router.get('/fetch', function (req, res) {
    let accessToken = req.headers['token'];
    if (accessToken === null) return res.json({status: 1, message: 'Missing access token.'});
    jwt.verify(accessToken, configs.SECRET, function (err, decoded) {
        if (err) {
            console.error(err);
            if (err.message === 'invalid signature') {
                return res.json({status: 2, message: 'Invalid signature. Please try again.'});
            }
            if (err.message === 'jwt expired') {
                return res.json({status: 3, message: 'Access token expired. Please login again.'});
            }
            return res.json({status: 4, message: 'Error: ' + err.message});
        } else {
            let articles = [
                {name: 'Paper1', author: 'Anh'},
                {name: 'Paper2', author: 'Suong'}
            ]
            return res.json({status: 0, articles: articles});
        }
    });
});

router.post('/add', (req, res) => {
    let type = req.body.type;
    let title = req.body.title;
    let abstract = req.body.publicationAbstract;
    let creators = req.body.creators;
    let corporateCreators = req.body.corporateCreators;
    let divisions = req.body.divisions;
    let selectedStatus = req.body.selectedStatus;
    let selectedRefereed = req.body.selectedRefereed;
    let bookSectionFirstPage = req.body.bookSectionFirstPage;
    let bookSectionEndPage = req.body.bookSectionEndPage;
    let bookSectionTitle = req.body.bookSectionTitle;
    let bookSectionPublicationPlace = req.body.bookSectionPublicationPlace;
    let bookSectionPublisher = req.body.bookSectionPublisher;
    let bookSectionPageNumber = req.body.bookSectionPageNumber;
    let bookSectionSeriesName = req.body.bookSectionSeriesName;
    let bookSectionISBN = req.body.bookSectionISBN;
    let bookSectionVolume = req.body.bookSectionVolume;
    let bookSectionNumber = req.body.bookSectionNumber;
    let subjects = req.body.subjects;
    let editors = req.body.editors;
    let selectedDateType = req.body.selectedDateType;
    let selectedDate = req.body.selectedDate;
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
    dbman.insertNewPublication(type, title, abstract, creators, corporateCreators, divisions, selectedStatus, selectedRefereed,
        bookSectionFirstPage, bookSectionEndPage, bookSectionTitle, bookSectionPublicationPlace, bookSectionPublisher,
        bookSectionPageNumber, bookSectionSeriesName, bookSectionISBN, bookSectionVolume, bookSectionNumber,
        subjects, editors, selectedDateType, selectedDate, publicationId, publicationURL, relatedURLs, funders, projects,
        emailAddress, references, unKeyword, addInformation, comment)
        .then(insertionResult => {
            console.log(insertionResult)
            return res.json({status: 200, message: 'Successfully added article.'});
        }).catch(console.log);
});


router.get('/info', function (req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

module.exports = router;
