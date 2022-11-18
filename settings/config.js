const got = require('got');
let configs = {};

module.exports.init = async (url) => {
  const data = await got.get(url).json();
  configs = data;
};

module.exports.getData = () => {
  return configs;
}
