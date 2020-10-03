const getAllArticles = function (db) {
  return new Promise(async (resolve, reject) => {
    await db.query("SELECT * from article", [], (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        resolve(res.rows);
      }
    });
  });
};

module.exports = {
  getAllArticles,
};
