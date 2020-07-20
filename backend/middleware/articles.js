const db = require("../lib/db.js");
const logger = require("../lib/logger");

module.exports = {
  isValidArticleID: (req, res, next) => {
    logger.log("Checking if article id is correct", 0);
    logger.log("Article_id => " + req.body.article , 0);
    try {
      let text = "SELECT * FROM article WHERE article_id = $1";
      let values = [req.body.article];
      db.query(text, values, (err, result) => {
        if (err) return res.status(400).send({ msg: err });
        else if (result.rows.length) {
          logger.log("Article id is correct", 1);
          next();
        } else {
          logger.log("Article id is incorrect", 2);
          return res.status(404).send({
            msg: "The article id is not correct",
          });
        }
      });
    } catch (err) {
      logger.log("There was an error checking article id", 3);
      return res.status(401).send({
        msg: "There was an error with you request",
      });
    }
  },
};
