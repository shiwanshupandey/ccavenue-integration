const express = require('express');
const bodyParser = require('body-parser');
const ccavReqHandler = require('./ccavRequestHandler');
const ccavResHandler = require('./ccavResponseHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/ccavRequestHandler', ccavReqHandler.postReq);
app.post('/ccavResponseHandler', ccavResHandler.postRes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
