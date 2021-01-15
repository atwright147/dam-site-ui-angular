const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const PORT = 3000;

const mediaModel = require('./generate-media');

app.get('/api/v1/photos', (req, res) => {
  res.json(mediaModel);
});

app.post('/api/v1/photos', (req, res) => {
  res.status(200);
});

app.get('/api/v1/photos/:id', (req, res) => {
  const media = mediaModel.media.filter(item => item.id === Number(req.params.id));
  res.json(media);
});

app.get('/api/v1/thumb/:id', (req, res) => {
  const media = mediaModel.media.filter(item => item.id === req.params.id)[0];
  res.sendFile(path.resolve(path.join('stubs', 'images', `${media.filename}.jpg`)));
});

app.listen(PORT, () => {
  console.info(`Example app listening on port ${PORT}`);  // eslint-disable-line no-console
});
