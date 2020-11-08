const rxjs = require('rxjs')
const db = require('./db')
const path = require('path')
const crypto = require('crypto')


module.exports = (app) => {
    db.init()
    let home$ = new rxjs.Subject()
    let users = []

    app.get('/', (req, res) => home$.next([req, res]))
    home$
    .subscribe((args) => {
            let [req, res] = args
            res.sendFile(path.join(__dirname + '/public/index.html'))
    })

    let register$ = new rxjs.Subject()
    app.get('/register', (req, res) => register$.next([req, res]))
    register$
    .subscribe((args) => {
            let [req, res] = args
            let username = req.query.username || ''
            const password = req.query.password || ''

            console.table(users)

            username = username.replace(/[!@#$%^&*]/g, '')

            if (!username || !password || users[username]) {
                return res.sendStatus(400);
            }

            const salt = crypto.randomBytes(128).toString('base64');
            const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

            users[username] = { salt, hash }

            res.sendStatus(200)
    })

    let auth$ = new rxjs.Subject()
    app.get('/auth', (req, res) => auth$.next([req, res]))
    auth$
    .subscribe((args) => {
            let [req, res] = args
            let username = req.query.username || ''
            const password = req.query.password || ''

            console.table(users)

            username = username.replace(/[!@#$%^&*]/g, '')

            if (!username || !password || !users[username]) {
                return res.sendStatus(400);
            }

            const { salt, hash } = users[username]
            const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

            if (crypto.timingSafeEqual(hash, encryptHash)) {
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
    })

}