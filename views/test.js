const crypto = require('crypto');
// crypto.randomBytes(256, (err, buf) => {
//   if (err) throw err;
//   console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
// });


let secret = `6e3ff794145978c121eb1e9a100590f31ab8376cb8b68835dd168d0f42d1f153f19bd5d4039d47be`
let password = 'chris'


const hash = crypto.createHmac( 'sha256', secret)
.update(password)

.digest('hex');
console.log(hash);

