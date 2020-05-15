// routes/router.js
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

const uuid = require("uuid");

router.get("/", (request, response) => {
  response.send("Our first Node.js webserver");
});

router.post(
  "/sign-up",
  userMiddleware.isSuperUser,
  userMiddleware.validateRegister,
  (req, res, next) => {
    let text = "SELECT * FROM user_login WHERE LOWER(username) = LOWER($1)";
    let values = [req.body.username];
    db.query(text, values, (err, result) => {
      if (result.rows.length) {
        console.log(
          "Received a request for a sign-up, there was an error with the username"
        );
        console.log("Client response => The username is already in use");
        return res.status(409).send({
          msg: "The username is already in use"
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(
              "Received a request for a sign-up, there was an error with the hashing"
            );
            return res.status(500).send({
              msg: err
            });
          } else {
            let text =
              "INSERT INTO user_login (id, username, password, register_date, is_superuser)" +
              " VALUES ($1, $2, $3, to_timestamp($4 / 1000.0), $5) RETURNING *";
            let date = Date.now();
            let uuid_user = uuid.v4();
            let values = [
              uuid_user,
              req.body.username,
              hash,
              date,
              req.body.superuser
            ];
            db.query(text, values, (err, database_response) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log(
                  "Received a request for a sign-up, added correctly to database"
                );
                console.log(database_response.rows[0]);
                console.log("Client response => New user added to database");
                res.status(200).send({ msg: "New user added to database" });
              }
            });
          }
        });
      }
    });
  }
);

router.post("/login", (req, res, next) => {
  let text = "SELECT * FROM user_login WHERE LOWER(username) = LOWER($1)";
  let values = [req.body.username];
  db.query(text, values, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
    if (result.rows.length) {
      console.log(
        "Received a request for a login, where there's an user with that username"
      );
      console.log("Client response => There's an user with this username");
      bcrypt.compare(
        req.body.password,
        result.rows[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr || !bResult) {
            console.log(
              "Received a request for a login, where there's an user with that username " +
                "but password was incorrect"
            );
            console.log("Client response => The password is incorrect");
            return res.status(401).send({
              msg: "The password is incorrect!"
            });
          } else {
            const token = jwt.sign(
              {
                username: result.rows[0].username,
                userId: result.rows[0].id
              },
              "SECRETKEY",
              {
                expiresIn: "7d"
              }
            );
            let text_last_login =
              "UPDATE user_login set last_login = now() where id = $1";
            let values_last_login = [result.rows[0].id];
            db.query(text_last_login, values_last_login, (err, result) => {
              if (err) {
                return res.status(400).send({ msg: err });
              } else {
                console.log(
                  "Received a request for a login, all data was correct"
                );
                console.log("Client response => Logged in correctly");
                return res.status(200).send({
                  msg: "Logged in correctly!",
                  token,
                  user: req.body.username
                });
              }
            });
          }
        }
      );
    } else {
      console.log(
        "Received a request for a login, where there's not an user with that username"
      );
      console.log("Client response => There's no user with this username");
      return res.status(412).send({
        msg: "There's no user with this username"
      });
    }
  });
});

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = router;
