const crypto = require('crypto');

function secretValue(){
  let value = ''
  for (var i = 0; i < 5; i++) {
    value += Math.floor(Math.random() * 10)
  }
  return value
}

function hash(password) {
  let secret = secretValue();
  let hash = crypto.createHmac('sha256',password)
              .update(password)
              .digest('hex')
  var obj ={
    secret : secret,
    hash :hash
  }
  return obj;
}

module.exports = hash;
