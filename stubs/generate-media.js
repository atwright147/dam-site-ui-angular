const fs = require('fs');
const faker = require('faker');

const imagesFolder = fs.readdirSync('./stubs/images');
const quantity = imagesFolder.length;

const cameras = [
  'Canon',
  'Nikon',
  'Panasonic',
];

const lenses = [
  '50mm',
  '25-75mm',
  '75-200mm',
]

faker.seed(1234567);
faker.locale = 'en_GB';

const models = [];

for (let index = 0; index < quantity; index++) {
  const model = {};

  const words = faker.lorem.words();
  const path = `/${words.split(' ').join('/')}/`;

  model['id'] = faker.random.uuid();
  model['filename'] = `image-${index + 1}`;
  model['path'] = path;
  model['camera'] = cameras[faker.random.number({ max: 2 })];
  model['lens'] = lenses[faker.random.number({ max: 2 })];

  models.push(model);
}

module.exports = models;
