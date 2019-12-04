const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const PORT = 3000;

const mediaModel = require('./generate-media');

app.get('/api/media', (req, res) => {
  res.json(mediaModel);
});

app.get('/api/media/:id', (req, res) => {
  const media = mediaModel.filter(item => item.id === Number(req.params.id));
  res.json(media);
});

app.post('/api/media', (req, res) => {
  res.status(200);
});

app.listen(PORT, () => {
  console.info(`Example app listening on port ${PORT}`);  // eslint-disable-line no-console
});
