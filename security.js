const express = require('express');
const dataBaseTools = require('./dataBaseTools')

class Role {
    constructor(role) {
        this.role = role;
    }
}

class ApplicationDataBaseUser {
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

let applicationInMemoryUsers = [
    new ApplicationDataBaseUser('user', 'user', 'USER'),
    new ApplicationDataBaseUser('admin', 'admin', 'ADMIN')
]

module.exports = {
    isAuthorized: function (username, password, requiredRole) {
        // zrobimy taki typowy basic auth, czyli będziemy wysylac usera i password za kazdym razem, no i oczywiscie czy ma role
        // sieganie bedzie do bazy po dane itd.. takie dziadostwo ale cóż
        return true
    },

    getUserLoginQuery: function (username, password) {
       return dataBaseTools.getUserLoginQuery(username, password);
    },

    registerUser: function (username, password, role) {
        dataBaseTools
            .getUserQuery(username)
            .exec(function (err, result) {
                if (result.length > 0) {
                    console.log("Znaleziono użytkowanika o takim samym username")
                } else {
                    dataBaseTools.registerUser(username, password, role)
                }
            })
    },

    Role: Role
}