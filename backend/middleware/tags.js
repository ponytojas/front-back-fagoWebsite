const db = require("../lib/db.js");
const logger = require("../lib/logger");

module.exports = {
  isValidTagID: (req, res, next) => {
    logger.log("Checking if tag id is correct", 0);
    logger.log("Tag_id => " + req.body.tag, 0);
    try {
      let text = "SELECT * FROM tag WHERE tag_id = $1";
      let values = [req.body.tag];
      db.query(text, values, (err, result) => {
        if (err) return res.status(400).send({ msg: err });
        else if (result.rows.length) {
          logger.log("Tag id is correct", 1);
          next();
        } else {
          logger.log("The tag id is incorrect", 2);
          return res.status(404).send({
            msg: "The tag id is not correct",
          });
        }
      });
    } catch (err) {
      logger.log("There was an error checking the tag id", 3);
      return res.status(401).send({
        msg: "There was an error with you request",
      });
    }
  },
};
