const fs = require('fs');
const faker = require('faker');
const { getDate } = require('./utils/get-date');

const imagesFolder = fs.readdirSync('./stubs/images');
const quantity = imagesFolder.length;
const quantityDates = 6;

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

const dates = [];
for (let index = 0; index < quantityDates; index++) {
  const date = faker.date.between('2018-01-01', Date());
  dates.push(date);
}

const media = [];
for (let index = 0; index < quantity; index++) {
  const model = {};

  const words = faker.lorem.words();
  const path = `/${words.split(' ').join('/')}/`;
  const fullDate = getDate(index, dates);
  const date = fullDate.toISOString().split('T')[0];
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth();

  // tslint:disable: no-string-literal
  model['id'] = faker.random.uuid();
  model['filename'] = `image-${index + 1}`;
  model['path'] = path;
  model['camera'] = cameras[faker.random.number({ max: 2 })];
  model['lens'] = lenses[faker.random.number({ max: 2 })];
  model['datetime'] = { date, year, month };
  // tslint:enable: no-string-literal

  media.push(model);
}

module.exports = { media, dates };
