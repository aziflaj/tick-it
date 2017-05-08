require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./router');

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/', (req, res) => { res.sendFile('index.html'); });
app.use('/api', apiRouter);

if (process.env.ENV === 'production') {
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
  });
} else {
  app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`Listening on 0.0.0.0:${app.get('port')}`);
  });
}
