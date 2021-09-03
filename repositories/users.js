const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);


class UsersRepository extends Repository {
  
  
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = ({
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`
    });

    records.push(record);
    //write the updated records array back to this.filename
    await this.writeAll(records);

    return attrs;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split('.'); //destructure saved
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64); //buffer

    return hashed === hashedSuppliedBuf.toString('hex');
  }

}

// TESTS
module.exports = new UsersRepository('users.json');