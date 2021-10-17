const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 2628

// Set Templating Enginge
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('', (req, res)=> {
    res.render('index')
})

app.get('/register', (req, res)=> {
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('firstname', 'firstname must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('lastname', 'lastname must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Please insert valid Email')
        .isEmail()
        .normalizeEmail()
], (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
})

app.listen(port, () => console.info(`App listening on port: ${port}`))