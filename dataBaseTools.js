const express = require('express');
const mongoose = require('mongoose');
var uuid = require('uuid');

createMongoConnection();
let RecipeModel = createRecipeModel();
let ApplicationUserModel = createApplicationUserModel();

function createMongoConnection() {
    let mongoDB = 'mongodb+srv://przepisy:przepisy@przepisy.kkxcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    return db;
}

function createRecipeModel() {
    let Schema = mongoose.Schema;
    let RecipeModelSchema = new Schema({
        recipeName: String,
        recipeDescription: String,
        author: String
    });

    return mongoose.model('RecipeModel', RecipeModelSchema);
}

function createApplicationUserModel() {
    let Schema = mongoose.Schema;
    let ApplicationUserModel = new Schema({
        username: String,
        password: String,
        role: String
    });

    return mongoose.model('ApplicationUserModel', ApplicationUserModel);
}

module.exports = {
    getRecipesQuery: function () {
        return RecipeModel.find({});
    },

    addRecipe: function (recipeName, recipeDescription, author) {
        let newRecipeModelInstance = new RecipeModel({
            recipeName: recipeName,
            recipeDescription: recipeDescription,
            author: author
        });

        newRecipeModelInstance.save(function (err) {
            if (err) console.log("Wystapil blad zapisu!");
            // saved!!
        })
    },

    removeRecipe: function (recipeId) {
        RecipeModel.findOneAndDelete({_id: recipeId}, function (err) {
            if (err) {
                console.log("Nie udało się usunąć rekordu o id: " + recipeId);
            }
        });
    },

    registerUser: function (username, password, role) {
        let newApplicationModelInstance = new ApplicationUserModel({
            username: username,
            password: password,
            role: role
        });

        newApplicationModelInstance.save(function (err) {
            if (err) console.log("Wystapil blad zapisu!");
            // saved!!
        })
    },

    getUserQuery: function (username) {
        return ApplicationUserModel.find({username: username});
    },

    getUserLoginQuery(username, password){
        return ApplicationUserModel.find({username: username, password: password});
    }
}