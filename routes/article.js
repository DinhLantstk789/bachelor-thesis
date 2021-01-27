var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
    let itemType = req.body.itemType;
    let title = req.body.title;
    let abstract = req.body.abstract;
    let creators = [];




});

router.get('/edit', function(req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

router.get('/delete', function(req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

router.get('/info', function(req, res, next) {
    res.send('{status:success, id: 123, name: Anh}');
});

module.exports = router;
