const configs = require('../utils/configs')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email === 'thusuong@gmail.com' && password === 'thusuongtk') {
        let user = {
            email: email,
            name: 'Thu Suong',
            isAdmin: true
        }
        user['accessToken'] = jwt.sign(user, configs.SECRET, {expiresIn: configs.ACCESS_TOKEN_LIFE});
        return res.json({status: 0, user: user})
    } else {
        return res.json({status: 1, message: 'Username and password do not match.'})
    }
})

router.get('/changePassword', function (req, res, next) {
    res.send('api for changePassword');
});

router.get('/logout', function (req, res, next) {
    res.send('api for user logout');
});

module.exports = router;
