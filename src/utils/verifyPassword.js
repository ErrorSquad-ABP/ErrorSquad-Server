const bcrypt = require('bcrypt');

async function verifyPassword(inputPassword, storedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    return isMatch;
}

module.exports = {verifyPassword}