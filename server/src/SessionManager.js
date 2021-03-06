"use strict"

/* Import all necessary modules. */
// 3rd party
const random = require('randomstring') // Used to generate the random session key.

// Own
const logger = require('./logger') // To log fatal errors.
const general_prop = require(__dirname + '/config/general_prop.js')('production')

/**
 * Stores the current session key.
 * NULL means that so session is open.
 * Only one session can be open at the same time.
 * @type {string}
 */
let sessionKey = null

/**
 * Set when a new session has ben open.
 * Used to expire the session.
 * @type date {number}
 */
let sessionCreateDate = null

/**
 * The maximum time a session can be open.
 * @type {number}
 */
const sessionMaxDuration = general_prop.sessionTimeout

/**
 * Timeout in seconds the procedure waits, if a wrong session key has been provided.
 * For security reasons to prevent brute force attacks.
 * Value is in milliseconds.
 * @type {number}
 */
const timeout = general_prop.securityTimeout

/**
 * Configurations for the random string generator.
 * Define how secure the generation is.
 * @type {{length: number, readable: boolean, charset: string, capitalization: null}}
 */
const randomOptions = {
    length: 20,
    readable: false,
    charset: 'alphanumeric',
    capitalization: null
}

/**
 * Check if a session is already open or if a new one can be created.
 * @return  available {boolean}
 *          true  - if no session exist
 *          false - else
 */
const sessionAvailable = async function () {
    // Check if the session key variable is set.
    if (sessionKey) return false
    else return true
}

/**
 * Open a new session by generate a new session key.
 * Only possible if a session is available.
 * @return  key {string}
 *          The generated session key.
 */
const openSession = async function () {
    // Check if a session is available.
    if (!sessionAvailable()) {
        throw new Error('Could open session, cause no session is available!')
    }

    // Generate a new session key.
    try {
        sessionKey = random.generate(randomOptions) // Generate new session key and store it.
        sessionCreateDate = new Date() // store the current date.
        return sessionKey // Return the key.
    } catch (err) {
        logger.logger.err('Error while try to generate a new session key: \n' + err)
        throw new Error('Something went wrong while try to generate a new session key.')
    }
}

/**
 * Check if a provided session key is valid.
 * Does not make an statement if a session exist or not.
 * For security reasons a wrong key leads to a delay.
 * @param   key {string}
 *          The provided session key to check.
 * @return  {boolean}
 *          true  - if the provided key is valid
 *          false - else
 *
 */
const checkSessionKey = async function (key) {
    // Compare the given key to the internal stored one.
    if (sessionKey === key) return true
    else {
        // Wait till return false, for security.
        setTimeout(function () {
            return false
        }, timeout);
    }
}

/**
 * Remove the current session, by set the sessio key to NULL.
 * It does not matter if a session exist or not.
 */
const clearSession = function () {
    // Set the session key to NULL.
    sessionKey = null
}

/**
 * Check if the current session is expired and remove it if necessary.
 * Compare the current date with the session create date.
 */
const checkSessionExpired = function () {
    // Only possible if any session has been already created.
    if (sessionCreateDate) {
        // Get the current session duration.
        const now = new Date();
        const duration = now - sessionCreateDate

        // Check if session is expired.
        if (duration > sessionMaxDuration) {
            clearSession()
        }
    }
}

// Define what should be exported.
module.exports = {
    sessionAvailable: sessionAvailable,
    openSession: openSession,
    checkSessionKey: checkSessionKey,
    clearSession: clearSession,
    checkSessionExpired: checkSessionExpired
}
