// routes/router.js
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const articleMiddleware = require("../middleware/articles.js");
const tagMiddleware = require("../middleware/tags.js");

const uuid = require("uuid");
const modelArticles = require("../lib/articles.js");
const modelTags = require("../lib/tags.js");
const modelArticlesTags = require("../lib/article-tag.js");

router.get("/", async (request, response) => {
  response.send("These aren't the Droids you're looking for. . . ");
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
          msg: "The username is already in use",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(
              "Received a request for a sign-up, there was an error with the hashing"
            );
            return res.status(500).send({
              msg: err,
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
              req.body.superuser,
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
              msg: "The password is incorrect!",
            });
          } else {
            const token = jwt.sign(
              {
                username: result.rows[0].username,
                userId: result.rows[0].id,
              },
              "SuperSecretKeyUsed",
              {
                expiresIn: "7d",
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
                  user: req.body.username,
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
        msg: "There's no user with this username",
      });
    }
  });
});

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

router.get("/articles", async (req, res, next) => {
  console.log("A new request trying to get all articles");
  res.send(await modelArticles.getAllArticles());
  console.log("All articles sent");
});

router.post(
  "/articles",
  userMiddleware.isLoggedIn,
  userMiddleware.isSuperUser,
  (req, res, next) => {
    console.log(req.userData);
    let date = Date.now();
    let uuid_article = uuid.v4();
    let text =
      "INSERT INTO article(article_id, title, subtitle, body, author, create_date, update_date)" +
      "VALUES($1, $2, $3, $4, $5,  to_timestamp($6 / 1000.0), to_timestamp($6 / 1000.0))";
    let values = [
      uuid_article,
      req.body.title,
      req.body.subtitle,
      req.body.body,
      req.body.author,
      date,
    ];
    db.query(text, values, (err) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Received a new article, added correctly to database");
        console.log("Client response => New article added to database");
        res.status(200).send({ msg: "New article added to database" });
      }
    });
  }
);

router.post(
  "/tags",
  userMiddleware.isLoggedIn,
  userMiddleware.isSuperUser,
  (req, res, next) => {
    console.log(req.userData);
    let uuid_tag = uuid.v4();
    let text = "INSERT INTO tag(tag_id, tag_name) VALUES($1, $2)";
    let values = [uuid_tag, req.body.tag_name];
    db.query(text, values, (err) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Received a new tag, added correctly to database");
        console.log("Client response => New tag added to database");
        res.status(200).send({ msg: "New tag added to database" });
      }
    });
  }
);

router.get("/tags", async (req, res, next) => {
  console.log("A new request trying to get all tags");
  res.send(await modelTags.getAllTags());
  console.log("All tags sent");
});

router.post(
  "/article-tag",
  userMiddleware.isLoggedIn,
  userMiddleware.isSuperUser,
  articleMiddleware.isValidArticleID,
  tagMiddleware.isValidTagID,
  (req, res, next) => {
    console.log("Checking if article is not already linked to tag");
    let oldQuery = "SELECT * FROM article_tag";
    db.query(oldQuery, [], (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      if (result.rows.length) {
        if (
          result.rows.filter(
            (tuple) =>
              tuple.article === req.body.article && tuple.tag === req.body.tag
          ).length
        ) {
          console.log("This article already has this tag");
          return res.status(400).send({ msg: "This tag already has this tag" });
        }
      }
      console.log("Article is not linked trying to link both");
      let insertQuery = "INSERT INTO article_tag(article, tag) VALUES($1, $2)";
      let valuesInsert = [req.body.article, req.body.tag];
      db.query(insertQuery, valuesInsert, (err, result) => {
        if (err) {
          return res.status(400).send({ msg: err });
        } else {
          console.log("Article correctly linked to tag");
          res.status(200).send({ msg: "Article correctly linked to tag" });
        }
      });
    });
  }
);

router.get("/article-tag", async (req, res, next) => {
  console.log("A new request trying to get all articles-tags");
  res.send(await modelArticlesTags.getAllArticlesTags());
  console.log("All articles-tags sent");
});

module.exports = router;
