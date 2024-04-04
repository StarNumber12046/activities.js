const bcrypt = require('bcrypt');

bcrypt.genSalt(10)
    .then((salt) => { console.log(Buffer.from(salt).toString('base64')); })
    .catch((err) => { console.error(err); });
