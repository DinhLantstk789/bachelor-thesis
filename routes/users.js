const express = require('express');
const router = express.Router();

router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    if (email === 'thusuong@gmail.com' && password === 'thusuongtk') {
        res.json({
            status: 'success',
            userType: 'admin',
            email: email
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
