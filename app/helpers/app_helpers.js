function arrayToObject(array) {
  let obj = {};
  let i = 0
  while (i < array.length) {
    obj[array[i]] = array[i+1];
    i += 2;
  }
  return obj;
}

module.exports.arrayToObject = arrayToObject;
