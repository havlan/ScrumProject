'use strict';
var crypto = require('crypto');
var generator = require('generate-password');


module.exports = {
//generer password
    generatePassword : function () { // min 8, store små bokstaver + 2 spes tegn
        var password = generator.generate({
            length: 8,
            numbers: true,
            uppercase: true,
            symbols: 2,
            strict: true,
            excludeSimilarCharacters: true
        });
        return password;
    },


    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */
    genRandomString : function (length) {
            return crypto.randomBytes(Math.ceil(length / 2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0, length);
            /** return required number of characters */
        },

        /**
         * hash password with sha512.
         * @function
         * @param {string} password - List of required fields.
         * @param {string} salt - Data to be validated.
         */
    sha512 : function (password, salt) {
        var hash = crypto.createHmac('sha512', salt);
        /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    },

        saltHashPassword : function(userpassword) {
            var salt = genRandomString(16);
            /** Gives us salt of length 16 */
            var passwordData = sha512(userpassword, salt);

            /**
             * passwordData.salt and passwordData.passwordHash is stored in db.
             *
             * when user logs in:
             *  - The user will enter the username/email and the password.
             *  - Fetch the hash and the salt based on the username entered
             *  - Combine the salt with the user password
             *  - Hash the combination with the same hashing algorithm.
             *  - Compare the result.
             */
        }
}