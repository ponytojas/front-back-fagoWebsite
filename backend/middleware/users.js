// middleware/users.js
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                msg: 'Please enter a username with min. 3 chars'
            });
        }

        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                msg: 'Please enter a password with min. 6 chars'
            });
        }
        // password (repeat) does not match
        if (
            !req.body.password_repeat ||
            req.body.password !== req.body.password_repeat
        ) {
            return res.status(400).send({
                msg: 'Both passwords must match'
            });
        }
        next();
    },

    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            req.userData = jwt.verify(
                token,
                'SECRETKEY'
            );
            next();
        } catch (err) {
            return res.status(401).send({
                msg: 'Your session is not valid!'
            });
        }
    },

    isSuperUser: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            req.userData = jwt.verify(
                token,
                'SECRETKEY'
            );
            let text = "SELECT * FROM user_login WHERE id = $1";
            let values = [req.userData.userId];
            db.query(text, values, (err, result) => {
                if (err)
                    return res.status(400).send({msg: err})
                else if (result.rows[0].is_superuser)
                    next()
                else
                    return res.status(401).send({
                        msg: 'Your session is not valid!'
                    });
            });
        } catch (err) {
            return res.status(401).send({
                msg: 'Your session is not valid!'
            });
        }
    }
}