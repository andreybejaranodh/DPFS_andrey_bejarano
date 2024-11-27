require('dotenv').config();
const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const moviesRoutes = require('./routes/movies');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/movies', moviesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
});