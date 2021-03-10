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

router.get('/edit', function (req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

router.get('/delete', function (req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

router.get('/info', function (req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

module.exports = router;
