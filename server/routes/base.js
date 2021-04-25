const configs = require('../utils/configs');
const jwt = require('jsonwebtoken');

const accessTokenCached = {}

module.exports = {
    saveNewAccessToken: (newAccessToken, loggedUser) => {
        accessTokenCached[newAccessToken] = loggedUser;
    },
    securityCheck: (req, res, onSuccess) => {
        let accessToken = req.cookies['accessToken'];
        if (accessToken === null) return res.json({status: 1, message: 'Missing access token.'});
        jwt.verify(accessToken, configs.SECRET, (err, decoded) => {
            if (err) {
                if (err.message === 'invalid signature')
                    return res.json({status: 401, message: 'Invalid signature. Please try again.'});
                if (err.message === 'jwt expired')
                    return res.json({status: 401, message: 'Access token expired. Please login again.'});
                return res.json({status: 401, message: 'Error: ' + err.message});
            } else {
                if (accessTokenCached[accessToken]) {
                    setTimeout(() => {
                        onSuccess(accessTokenCached[accessToken]);
                    }, configs.API_DELAY);
                } else {
                    return res.json({status: 401, message: 'Access token is invalid or has been revoked. Please try again.'});
                }
            }
        });
    }
}
