const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const PORT = 3000;

const mediaModel = require('./generate-media');

app.get('/api/v1/media', (req, res) => {
  res.json(mediaModel);
});

app.post('/api/v1/media', (req, res) => {
  res.status(200);
});

app.get('/api/v1/media/:id', (req, res) => {
  const media = mediaModel.filter(item => item.id === Number(req.params.id));
  res.json(media);
});

app.get('/api/v1/thumb/:id', (req, res) => {
  const media = mediaModel.filter(item => item.id === req.params.id)[0];
  res.sendFile(path.resolve(path.join('stubs', 'images', `${media.filename}.jpg`)));
});

app.listen(PORT, () => {
  console.info(`Example app listening on port ${PORT}`);  // eslint-disable-line no-console
});
