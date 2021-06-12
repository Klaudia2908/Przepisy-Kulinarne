const express = require('express');
const router = express.Router();
const securityTools = require('../security')


router.post('/', function (req, res) {
    let requestBody = JSON.parse(JSON.stringify(req.body));
    securityTools.registerUser(requestBody.userName, requestBody.password, requestBody.role);

    res.status(201);
    res.json(new Object("OK"));
})

module.exports = router;