const configs = require('../utils/configs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbman = require("../utils/dbman");
const bcrypt = require('bcrypt');
const {saveNewAccessToken} = require("./base");
const {securityCheck} = require("./base");

router.post('/login', (req, res) => {
    let email = req.body.email, receivedPassword = req.body.password;
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
                saveNewAccessToken(accessToken, returnedUser);
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
    securityCheck(req, res, (loggedUser) => {
        let email = req.body.email;
        let familyName = req.body.familyName;
        let givenName = req.body.givenName;
        let password = req.body.password;
        let department = req.body.department;
        let address = req.body.address;
        let isAdmin = req.body.isAdmin;
        let description = req.body.description;
        let registrationDate = new Date();
        let isApproved = true;
        // TODO: if creator exist -> update is approved to true!
        bcrypt.hash(password, 10, function (err, hash) {
            dbman.insertUser(email, familyName, givenName, hash, department, address, isAdmin, description, registrationDate, isApproved).then(email => {
                return res.json({status: 200, message: 'Successfully added user:', email: email});
            }).catch(console.log);
        });
    })
});
router.post('/fetchUser', (req, res) => {
    securityCheck(req, res, (loggedUser) => {
        dbman.fetchUserInformation(null).then(userList => {
            return res.json({status: 200, userList: userList});
        }).catch(console.log);
    })
});

router.post('/deleteUser', (req, res) => {
    securityCheck(req, res, (loggedUser) => {
        dbman.deleteUser(req.body.email).then(deletedUser => {
            if (deletedUser) {
                res.json({status: 200, message: 'User deleted'});
            }
        }).catch(console.log)
    })
});
router.post('/fetchFullyUserData', (req, res) => {
    securityCheck(req, res, (loggedUser) => {
        dbman.fetchUserInformation(req.body.email).then(userData => {
            return res.json({status: 200, userData: userData});
        }).catch(console.log);
    })
});

router.get('/logout', (req, res) => {
    securityCheck(req, res, (loggedUser) => {
        res.clearCookie('accessToken');
        return res.json({status: 200, message: 'Logout success'});
    })
});

router.post('/verifyCookie', (req, res) => {
    securityCheck(req, res, (loggedUser) => {
        return res.json({status: 200, user: loggedUser});
    })
});

module.exports = router;
