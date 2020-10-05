// middleware/users.js
const jwt = require("jsonwebtoken");
const pool = require("../lib/db.js");
const logger = require("../lib/logger");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  validateRegister: (req, res, next) => {
    try {
      logger.log("Checking if username is correct", 0);
      logger.log("Username => " + req.body.username, 0);
      if (!req.body.username || req.body.username.length < 3) {
        logger.log("The username is not at least 3 chars", 2);
        return res.status(400).send({
          msg: "Please enter a username with min. 3 chars",
        });
      }
      logger.log("Username correct", 1);
      logger.log("Checking if password is correct", 0);
      logger.log("Password => " + req.body.password, 0);
      if (!req.body.password || req.body.password.length < 6) {
        logger.log("The password is not at least 6 chars", 2);
        return res.status(400).send({
          msg: "Please enter a password with min. 6 chars",
        });
      }
      logger.log("Password correct", 1);
      logger.log("Checking if password_repeat is correct", 0);
      logger.log("Password_repeat => " + req.body.password_repeat, 0);
      if (
          !req.body.password_repeat ||
          req.body.password !== req.body.password_repeat
      ) {
        logger.log("Password repeat is not the same", 2);
        return res.status(400).send({
          msg: "Both passwords must match",
        });
      }
      logger.log("Password correct", 1);
      logger.log("Everything correct, creating user", 1);
      next();
    }catch (e) {
      logger.log(e, 3)
    }
  },

  isLoggedIn: (req, res, next) => {
    logger.log("Checking if user is loggedIn", 0);
    logger.log("JWT => " + req.headers.authorization, 0);
    try {
      let token = req.headers.authorization;
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      req.userData = jwt.verify(token, process.env.JWT_KEY);
      logger.log("Correct user session", 1);
      next();
    } catch (err) {
      logger.log("There was an error checking the session", 2);
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },

   isSuperUser: async (req, res, next) => {
    logger.log("Checking if user is SuperUser", 0);
    logger.log("JWT => " + req.headers.authorization, 0);
     let db = await pool.connect();
    try {
      let token = req.headers.authorization;
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      let data = jwt.verify(token, process.env.JWT_KEY);
      let text = "SELECT * FROM user_login WHERE user_id = $1";
      let values = [data.userId];

      db.query(text, values, (err, result) => {
        if (err) return res.status(400).send({ msg: err });
        else if (result.rows[0].is_superuser) {
          logger.log("Correct superuser session", 1);
          next();
        } else {
          logger.log("Incorrect superuser session", 2);
          return res.status(401).send({
            msg: "Your session is not valid!",
          });
        }
      });
      db.release();
    } catch (err) {
      logger.log("There was an error checking the session", 3);
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
      db.release();
    }
  },
};
