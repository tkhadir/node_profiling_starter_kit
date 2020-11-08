var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

let init = () => {
    db.serialize(() => {
        db.run("CREATE TABLE users (jdoc JSON)")
    })
}

let save = (doc) => {
    try {
        db.serialize(() => {
            db.run("INSERT INTO users VALUES('" + JSON.stringify(doc) + "')")
        })
    } catch (e) {
        console.error(e)
    }
}

let list = (callback) => {
    db.all("select jdoc from users",[], (err, rows) => {
            callback(rows)
    })
}

module.exports.init = init
module.exports.save = save
module.exports.list = list