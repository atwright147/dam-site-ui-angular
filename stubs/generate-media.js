const faker = require('faker');

const quantity = 8;

const images = [
  'https://images.pexels.com/photos/758733/pexels-photo-758733.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/21261/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/567973/pexels-photo-567973.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/776653/pexels-photo-776653.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/131046/pexels-photo-131046.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/302515/pexels-photo-302515.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/301682/pexels-photo-301682.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
  'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
];

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
  model['filename'] = images[index];
  model['path'] = path;
  model['camera'] = cameras[faker.random.number({ max: 2 })];
  model['lens'] = lenses[faker.random.number({ max: 2 })];

  models.push(model);
}

module.exports = models;
