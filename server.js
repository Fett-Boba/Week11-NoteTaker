const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Insure we can serve static css and js
app.use(express.static('public'));

// Listener
app.listen(PORT, () => console.log('Now listening'));

