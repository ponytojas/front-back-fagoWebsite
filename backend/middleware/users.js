// middleware/users.js
const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");

module.exports = {
  validateRegister: (req, res, next) => {
    console.log("Checking if username is correct");
    console.log("Username => " + req.body.username);
    if (!req.body.username || req.body.username.length < 3) {
      console.log("The username is not at least 3 chars");
      return res.status(400).send({
        msg: "Please enter a username with min. 3 chars",
      });
    }
    console.log("Username correct");
    console.log("Checking if password is correct");
    console.log("Password => " + req.body.password);
    if (!req.body.password || req.body.password.length < 6) {
      console.log("The password is not at least 6 chars");
      return res.status(400).send({
        msg: "Please enter a password with min. 6 chars",
      });
    }
    console.log("Password correct");
    console.log("Checking if password_repeat is correct");
    console.log("Password_repeat => " + req.body.password_repeat);
    if (
      !req.body.password_repeat ||
      req.body.password !== req.body.password_repeat
    ) {
      console.log("Password repeat is not the same");
      return res.status(400).send({
        msg: "Both passwords must match",
      });
    }
    console.log("Password correct");
    console.log("Everything correct, creating user");
    next();
  },

  isLoggedIn: (req, res, next) => {
    console.log("Checking if user is loggedIn");
    console.log("JWT => " + req.headers.authorization);
    try {
      const token = req.headers.authorization;
      req.userData = jwt.verify(token, "SuperSecretKeyUsed");
      console.log("Correct user session");
      next();
    } catch (err) {
      console.log("There was an error checking the session");
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },

  isSuperUser: (req, res, next) => {
    console.log("Checking if user is SuperUser");
    console.log("JWT => " + req.headers.authorization);
    try {
      const token = req.headers.authorization;
      req.userData = jwt.verify(token, "SuperSecretKeyUsed");
      let text = "SELECT * FROM user_login WHERE id = $1";
      let values = [req.userData.userId];
      db.query(text, values, (err, result) => {
        if (err) return res.status(400).send({ msg: err });
        else if (result.rows[0].is_superuser) {
          console.log("Correct superuser session");
          next();
        } else {
          console.log("Incorrect superuser session");
          return res.status(401).send({
            msg: "Your session is not valid!",
          });
        }
      });
    } catch (err) {
      console.log("There was an error checking the session");
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
};
