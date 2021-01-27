var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    let email = req.headers.email;
    let password = req.headers.password;
    if (email === 'thusuong@gmail.com' && password === 'thusuongtk') {
        res.json({
            status: 200,
            message: 'Login success!.'
        });
    } else {
        res.json({
            status: 404,
            message: 'Not found.'
        });
    }
});

router.get('/changePassword', function (req, res, next) {
    res.send('api for changePassword');
});

router.get('/logout', function (req, res, next) {
    res.send('api for user logout');
});

module.exports = router;
