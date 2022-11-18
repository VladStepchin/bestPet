const mongoose = require('mongoose');

module.exports = ({ uri, options }) => new Promise((resolve, reject) => mongoose.connect(uri, options, (err) => {
  if (err) {
    return reject(err);
  }
  return resolve();
}));