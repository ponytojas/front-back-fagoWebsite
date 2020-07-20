const db = require("../lib/db.js");

const getAllTags =  function() {
    return new Promise(async (resolve) =>
        {
            await db.query('SELECT * from tag', [], (err, res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    resolve(res.rows);
                }
            })
        }
    )
}

module.exports = {
    getAllTags
}
