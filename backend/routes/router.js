// routes/router.js
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const articleMiddleware = require("../middleware/articles.js");
const tagMiddleware = require("../middleware/tags.js");
const logger = require("../lib/logger");

const uuid = require("uuid");
const modelArticles = require("../lib/articles.js");
const modelTags = require("../lib/tags.js");
const modelArticlesTags = require("../lib/article-tag.js");

const modelData = require("../data/data");
firstServerRun().then(() => logger.log("Everything up-to-date", 1));

async function firstServerRun() {
  logger.log("Starting to generate data for first run", 0);
  await modelData.setData(await modelArticles.getAllArticles(), 0);
  await modelData.setData(await modelTags.getAllTags(), 1);
  await modelData.setData(await modelArticlesTags.getAllArticlesTags(), 2);
  await modelData.setData("", 3);
}

router.get("/", async (request, response) => {
  logger.log("These aren't the Droids you're looking for . . . ", 2);
  response.send("These aren't the Droids you're looking for . . . ");
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
        logger.log(
          "Received a request for a sign-up, there was an error with the username",
          0
        );
        logger.log("Client response => The username is already in use", 2);
        return res.status(409).send({
          msg: "The username is already in use",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            logger.log(
              "Received a request for a sign-up, there was an error with the hashing",
              3
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
                logger.log(err.stack, 3);
              } else {
                logger.log(
                  "Received a request for a sign-up, added correctly to database",
                  1
                );
                logger.log(database_response.rows[0], 0);
                logger.log("Client response => New user added to database", 1);
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
      logger.log(
        "Received a request for a login, where there's an user with that username",
        0
      );
      logger.log("Client response => There's an user with this username", 0);
      bcrypt.compare(
        req.body.password,
        result.rows[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr || !bResult) {
            logger.log(
              "Received a request for a login, where there's an user with that username " +
                "but password was incorrect",
              2
            );
            logger.log("Client response => The password is incorrect", 2);
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
                logger.log(
                  "Received a request for a login, all data was correct",
                  1
                );
                logger.log("Client response => Logged in correctly", 1);
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
      logger.log(
        "Received a request for a login, where there's not an user with that username",
        2
      );
      logger.log("Client response => There's no user with this username", 2);
      return res.status(412).send({
        msg: "There's no user with this username",
      });
    }
  });
});

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  logger.log("UserID: " + req.userData.userId + " - Username: " +req.userData.username, 0);
  res.send("This is the secret content. Only logged in users can see that!");
  logger.log("Secret content sent, this only has debug purposes", 1);
});

router.get("/articles", async (req, res, next) => {
  logger.log("A new request trying to get all articles", 0);
  res.send(await modelArticles.getAllArticles());
  logger.log("All articles sent", 1);
});

router.post(
  "/articles",
  userMiddleware.isLoggedIn,
  userMiddleware.isSuperUser,
  async (req, res, next) => {
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
        logger.log(err.stack, 3);
      } else {
        logger.log("Received a new article, added correctly to database", 1);
        logger.log("Client response => New article added to database", 1);
        res.status(200).send({ msg: "New article added to database" });
      }
    });
    await modelData.setData(await modelArticles.getAllArticles(), 0);
    await modelData.setData("", 3);
  }
);

router.post(
  "/tags",
  userMiddleware.isLoggedIn,
  userMiddleware.isSuperUser,
  async (req, res, next) => {
    logger.log("Getting new tags to add", 0);
    logger.log(req.userData, 0);
    let uuid_tag = uuid.v4();
    let text = "INSERT INTO tag(tag_id, tag_name) VALUES($1, $2)";
    let values = [uuid_tag, req.body.tag_name];
    db.query(text, values, (err) => {
      if (err) {
        logger.log(err.stack, 3);
      } else {
        logger.log("Received a new tag, added correctly to database", 1);
        logger.log("Client response => New tag added to database", 1);
        res.status(200).send({ msg: "New tag added to database" });
      }
    });
    await modelData.setData(await modelTags.getAllTags(), 1);
    await modelData.setData("", 3);
  }
);

router.get("/tags", async (req, res, next) => {
  logger.log("A new request trying to get all tags", 0);
  res.send(await modelTags.getAllTags());
  logger.log("All tags sent", 1);
});

router.post(
  "/article-tag",
  userMiddleware.isLoggedIn,
  userMiddleware.isSuperUser,
  articleMiddleware.isValidArticleID,
  tagMiddleware.isValidTagID,
  async (req, res, next) => {
    logger.log("Checking if article is not already linked to tag", 0);
    let oldQuery = "SELECT * FROM article_tag";
    db.query(oldQuery, [], (err, result) => {
      if (err) {
        console.log(err.stack, 3);
        return res.status(400).send({ msg: err });
      }
      if (result.rows.length) {
        if (
          result.rows.filter(
            (tuple) =>
              tuple.article === req.body.article && tuple.tag === req.body.tag
          ).length
        ) {
          logger.log("This article already has this tag", 2);
          return res.status(400).send({ msg: "This tag already has this tag" });
        }
      }
      logger.log("Article is not linked trying to link both", 0);
      let insertQuery = "INSERT INTO article_tag(article, tag) VALUES($1, $2)";
      let valuesInsert = [req.body.article, req.body.tag];
      db.query(insertQuery, valuesInsert, (err, result) => {
        if (err) {
          logger.log(err.stack, 3);
          return res.status(400).send({ msg: err });
        } else {
          logger.log("Article correctly linked to tag", 1);
          res.status(200).send({ msg: "Article correctly linked to tag" });
        }
      });
    });
    await modelData.setData(await modelArticlesTags.getAllArticlesTags(), 2);
    await modelData.setData("", 3);
  }
);

router.get("/article-tag", async (req, res, next) => {
  logger.log("A new request trying to get all articles-tags", 0);
  res.send(await modelArticlesTags.getAllArticlesTags());
  logger.log("All articles-tags sent", 1);
});

router.get("/get-data-for-web-debug", async (req, res, next) => {
  logger.log("A new request trying to get data for web", 4);
  await modelData.setData(await modelArticles.getAllArticles(), 0);
  await modelData.setData(await modelTags.getAllTags(), 1);
  await modelData.setData(await modelArticlesTags.getAllArticlesTags(), 2);
  await modelData.setData("", 3);
  res.send(await modelData.getData());
  logger.log("All data for web sent", 4);
});

router.get("/get-data-for-web", async (req, res, next) => {
  logger.log("A new request trying to get data for web", 0);
  res.send(await modelData.getData());
  logger.log("All data for web sent", 1);
});

module.exports = router;
