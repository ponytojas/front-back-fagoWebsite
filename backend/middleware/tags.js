const db = require('../lib/db.js');

module.exports = {
    isValidTagID: (req, res, next) => {
        console.log("Checking if tag id is correct")
        console.log("Tag_id => " + req.body.tag)
        try {
            let text = "SELECT * FROM tag WHERE tag_id = $1";
            let values = [req.body.tag];
            db.query(text, values, (err, result) => {
                if (err)
                    return res.status(400).send({msg: err})
                else if (result.rows.length) {
                    console.log("Tag id is correct")
                    next()
                }
                else {
                    console.log("The tag id is incorrect")
                    return res.status(404).send({
                        msg: 'The tag id is not correct'
                    });
                }
            });
        } catch (err) {
            console.log("There was an error checking the tag id")
            return res.status(401).send({
                msg: 'There was an error with you request'
            });
        }
    }
}