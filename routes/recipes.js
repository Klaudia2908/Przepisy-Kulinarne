const express = require('express');
const router = express.Router();
const securityTools = require('../security')
const dataBaseTools = require('../dataBaseTools')

router.get('/', function (req, res) {
    let recipesQuery = dataBaseTools.getRecipesQuery();
    recipesQuery.exec(function (err, recipes){
        res.json(recipes);
    });
});

router.post("/", function (req, res) {
    let username = req.cookies['username'];
    let password = req.cookies['password'];
    let requestBody = JSON.parse(JSON.stringify(req.body));

    if (!securityTools.isAuthorized(username, password, 'USER')) {
        res.status(401);
        res.json(new securityTools.Role("UNAUTHORIZED"));
        return;
    }
    addRecipe(requestBody, username);
    res.status(201);
    res.json(new Object("OK"));
});

router.delete("/:id", function (req, res) {
    let recipeId = req.params.id;
    let username = req.cookies['username'];
    let password = req.cookies['password'];

    removeRecipe(recipeId);
    if (!securityTools.isAuthorized(username, password, 'ADMIN')) {
        res.status(401);
        res.json(new securityTools.Role("UNAUTHORIZED"));
        return;
    }

    res.status(200);
    res.json(new Object("OK"));
});

function removeRecipe(recipeId) {
    dataBaseTools.removeRecipe(recipeId);
}

function addRecipe(recipe, author) {
    if(textEmpty(recipe.recipeName) || textEmpty(recipe.recipeDescription)){
        return;
    }

    dataBaseTools.addRecipe(recipe.recipeName, recipe.recipeDescription, author);
}

function textEmpty(text){
    return text === null || text === '';
}

module.exports = router;
