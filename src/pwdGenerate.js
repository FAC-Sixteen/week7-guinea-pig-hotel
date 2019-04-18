const bcrypt = require("bcrypt");

const hashPwd = (myPlaintextPassword, cb) => {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      cb(err);
    } else {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        cb(null, hash);
      });
    }
  });
};
