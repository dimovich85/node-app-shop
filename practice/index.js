const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const homeRoute = require(path.join(__dirname, 'routes', 'home.js'));
const coursesRoute = require(path.join(__dirname, 'routes', 'courses.js'));
const addRoute = require(path.join(__dirname, 'routes', 'add.js'));
const cartRoute = require(path.join(__dirname, 'routes', 'cart.js'));

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRoute);
app.use('/courses', coursesRoute);
app.use('/add', addRoute);
app.use('/cart', cartRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}!`);
});