const db = require("../lib/db.js");

const getAllArticlesTags = function () {
  return new Promise(async (resolve, reject) => {
    await db.query("SELECT * from article_tag", [], (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        resolve(res.rows);
      }
    });
  });
};

module.exports = {
  getAllArticlesTags,
};
