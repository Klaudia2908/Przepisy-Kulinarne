const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const recipeRouter = require('./routes/recipes')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

const app = express();

class Server {
    constructor() {
        this.start();
        this.config();
    }

    start() {
        module.exports = app;
    }

    config(){
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        app.use('/', indexRouter);
        app.use('/recipe', recipeRouter);
        app.use('/login', loginRouter);
        app.use('/register', registerRouter);
    }
}

new Server();





