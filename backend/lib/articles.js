const db = require("../lib/db.js");


const getAllArticles =  function() {
    return new Promise(async (resolve, reject) =>
    {
        await db.query('SELECT * from article', [], (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                conosle.log(res.rows)
                resolve(res.rows);
            }
        })
    }
    )
}

module.exports = {
    getAllArticles
}
