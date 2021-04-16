const configs = require('../utils/configs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbman = require("../utils/dbman");
const bcrypt = require('bcrypt');
const {securityCheck} = require("./base");


const accessTokenCached = {}
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
                accessTokenCached[accessToken] = returnedUser;
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
    securityCheck(req, res, (accessToken) => {
        let givenName = req.body.givenName;
        let familyName = req.body.familyName;
        let email = req.body.email;
        let address = req.body.address;
        let department = req.body.department;
        let role = req.body.role;
        let password= req.body.password;
        let userDescription = req.body.userDescription;
        dbman.insertUser(givenName, familyName, email, address, department,password, role, userDescription).then(email => {
            return res.json({status: 200, message: 'Successfully added user:',email:email});
        }).catch(console.log);
    })
});
router.post('/fetchUser', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        dbman.fetchUserInformation(null).then(userList => {
            return res.json({status: 200, userList: userList});
        }).catch(console.log);
    })
});
router.post('/deleteUser', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        dbman.deleteUser(req.body.email).then(deletedUser => {
            if (deletedUser) {
                res.json({status: 200, message: 'User deleted'});
            }
        }).catch(console.log)
    })
});
router.post('/fetchFullyUserData', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        dbman.fetchUserInformation(req.body.email).then(userData => {
            return res.json({status: 200, userData: userData});
            console.log(userData);
        }).catch(console.log);
    })
});

router.post('/verifyCookie', (req, res) => {
    securityCheck(req, res, (accessToken) => {
        if (accessTokenCached[accessToken]) { // TODO: store accessTokenCached across different routes
            return res.json({status: 200, user: accessTokenCached[accessToken]});
        }
        return res.json({status: 401, message: 'Access token does not exist or has been revoked.'});
    })
});

router.get('/logout', function (req, res, next) {
    res.send('api for user logout');
});

module.exports = router;
