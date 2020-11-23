const getDate = (index, dates) => {
  let date;

  // tslint:disable: curly
  if (index <= 5) date = dates[0];
  if (index > 5 && index <= 10) date = dates[1];
  if (index > 10 && index <= 15) date = dates[2];
  if (index > 15 && index <= 20) date = dates[3];
  if (index > 20 && index <= 25) date = dates[4];
  if (index > 25 && index <= 30) date = dates[5];
  // tslint:enable: curly

  return date;
};

module.exports = { getDate };
