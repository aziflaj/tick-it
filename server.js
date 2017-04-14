const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const ExampleController = require('./app/controllers/ExampleController.js');

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/example', ExampleController.index);
app.get('/example/:id', ExampleController.show);
app.post('/example', ExampleController.create);
app.put('/example/:id', ExampleController.update);
app.delete('/example/:id', ExampleController.delete);

app.listen(5000, '0.0.0.0', () => { console.log('Listening on 0.0.0.0:5000'); });
