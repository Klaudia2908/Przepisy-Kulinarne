const express = require('express');
const router = express.Router();
const securityTools = require('../security')

router.post('/', function (req, res, next) {
    let loginDataJson = JSON.stringify(req.body);
    let loginData = JSON.parse(loginDataJson);
    let login = loginData.login;
    let password = loginData.password;

    console.log("Użytkownik: " + login + " próbuje zalogować się do aplikacji.");
    securityTools.getUserLoginQuery(login, password).exec(function (err, users) {
        if (users.length > 0) {
            res.status(200);
            res.cookie('username', login);
            res.cookie('password', password);
        } else {
            res.status(401);
        }

        res.json(users[0]);
    })
});

module.exports = router;