// routes/router.js

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
            req.body.username
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        db.query(
                            `INSERT INTO users (username, password, register_date) VALUES (
                            ${db.escape(req.body.username)}, ${db.escape(hash)}, now())`,
                            (err) => {
                                if (err) {
                                    throw err;
                                }
                                return res.status(201).send({
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (req, res, next) => {
});

router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;