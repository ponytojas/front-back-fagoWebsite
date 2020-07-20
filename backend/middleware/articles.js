const db = require('../lib/db.js');

module.exports = {
    isValidArticleID: (req, res, next) => {
        console.log("Checking if article id is correct");
        console.log("Article_id => " + req.body.article);
        try {
            let text = "SELECT * FROM article WHERE article_id = $1";
            let values = [req.body.article];
            db.query(text, values, (err, result) => {
                if (err)
                    return res.status(400).send({msg: err})
                else if (result.rows.length) {
                    console.log("Article id is correct")
                    next()
                }
                else {
                    console.log("Article id is incorrect")
                    return res.status(404).send({
                        msg: 'The article id is not correct'
                    });
                }
            });
        } catch (err) {
            console.log("There was an error checking article id")
            return res.status(401).send({
                msg: 'There was an error with you request'
            });
        }
    }
}