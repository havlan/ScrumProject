'use strict';
var crypto = require('crypto');
var generator = require('generate-password');


module.exports = {

    /**
     * Generates a random password.
     * @function
     * @returns password
     */
    generatePassword : function () { // generate random password
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

        }
}