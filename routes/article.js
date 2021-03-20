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
                dbman.fetchAllPublications().then(publications => {
                    return res.json({status: 200, publications: publications});
                }).catch(console.log);
            }, 2000);
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
    let status = req.body.selectedStatus;
    let selectedRefereed = req.body.selectedRefereed;
    let firstPage = req.body.bookSectionFirstPage;
    let endPage = req.body.bookSectionEndPage;
    let bookSectionTitle = req.body.bookSectionTitle;
    let publicationPlace = req.body.bookSectionPublicationPlace;
    let publisher = req.body.bookSectionPublisher;
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
    setTimeout(() => {
        dbman.insertNewPublication(type, title, abstract, creators, corporateCreators, divisions, status, selectedRefereed,
            firstPage, endPage, bookSectionTitle, publicationPlace, publisher,
            pageNumber, seriesName, bookSectionISBN, volume, number,
            subjects, editors, dateType, date, publicationId, publicationURL, relatedURLs, funders, projects,
            emailAddress, references, unKeyword, addInformation, comment).then(pubId => {
            return res.json({status: 200, message: 'Successfully added publication:' + pubId.toString()});
        }).catch(console.log);
    }, 2000);
});

module.exports = router;
