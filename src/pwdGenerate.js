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

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      callback(new Error(err));
    } else {
      callback(null, res);
    }
  });
};

module.exports = { hashPwd, comparePasswords };
