require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const ExampleController = require('./app/controllers/ExampleController.js');
const example = new ExampleController();
const UsersController = require('./app/controllers/UsersController.js');
const users = new UsersController();

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/example', example.index);

app.get('/users/:id', users.show);
app.post('/users', users.create);

app.listen(5000, '0.0.0.0', () => { console.log('Listening on 0.0.0.0:5000'); });
