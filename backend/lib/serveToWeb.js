const db = require("../lib/db.js");

const getDataForWeb = function () {
  return new Promise(async (resolve, reject) => {
    await db.query(
      "select article_id, title, subtitle, body, author, create_date, update_date, tag_id, tag_name from article natural join article_tag natural join tag;",
      [],
      (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          resolve(res.rows);
        }
      }
    );
  });
};

module.exports = {
  getDataForWeb,
};
