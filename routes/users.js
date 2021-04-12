const configs = require('../utils/configs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbman = require("../utils/dbman");
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    let email = req.body.email;
    let receivedPassword = req.body.password;
    dbman.findUser(email).then(user => {
        if (user === null) return res.json({status: 401, message: 'Account not found'});
        let hashedPassword = user.password;
        bcrypt.compare(receivedPassword, hashedPassword, (err, bcryptRes) => {
            if (bcryptRes) {
                let returnedUser = {
                    email: user.email,
                    familyName: user.family_name,
                    givenName: user.given_name,
                    isAdmin: user.is_admin
                }
                let accessToken = jwt.sign(returnedUser, configs.SECRET, {expiresIn: configs.ACCESS_TOKEN_LIFE});
                let cookieConfig = {
                    maxAge: configs.ACCESS_TOKEN_LIFE * 1000,
                    secure: false,
                    httpOnly: true /* prevent cookie being read by JS */
                }
                res.cookie('accessToken', accessToken, cookieConfig);
                return res.json({status: 200, user: returnedUser})
            } else {
                return res.json({status: 401, message: 'Username and password do not match.'});
            }
        });
    }).catch(console.log);
})
router.post('/addUser', (req, res) => {
    let givenName = req.body.givenName;
    let familyName = req.body.familyName;
    let email = req.body.email;
    let address = req.body.address;
    let department = req.body.department;
    let role = req.body.role;
    let userDescription = req.body.userDescription;
    dbman.insertUser(givenName, familyName, email, address, department, role, userDescription).then(email => {
        return res.json({status: 200, message: 'Successfully added user:' + email.toString()});
    }).catch(console.log);
});
router.post('/fetchUser', (req, res) => {
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
                dbman.fetchUserInformation(null).then(userList => {
                    return res.json({status: 200, userList: userList});
                }).catch(console.log);
            }, 2000);
        }
    });
});

router.get('/changePassword', function (req, res, next) {
    res.send('api for changePassword');
});

router.get('/logout', function (req, res, next) {
    res.send('api for user logout');
});

module.exports = router;
