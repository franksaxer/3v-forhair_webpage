import Vue from 'vue'

// Globally store the session key for further calls.
// Try to load a locally cached session key.
const sessionLocalPropertyName = 'sessionKey' // To grant unified access.
let sessionKey = window.localStorage[sessionLocalPropertyName]

const validateSession = async function() {
  // TODO: Verify session by backend for obsolete sessions.
  console.log('Check session for key: ' + sessionKey)

  // Variable to set if the session has been verified.
  let valid = false

  if (sessionKey) {
    const data = {
      sessionKey: sessionKey
    }

    try {
      await Vue.http
        .post(process.env.API_URL + '/api/authentication/check', data)
        .then(
          response => {
            // eslint-disable-next-line no-unneeded-ternary
            valid = response.bodyText === 'true' ? true : false
            console.log('Server validation response: ' + valid)
          },
          error => {
            console.log(
              'Validating the session key was not successful due to an error!'
            )
            console.log(error.bodyText)
          }
        )
    } catch (err) {
      console.log(
        'Validating the session key was not possible on trying to connect to the server.'
      )
      console.log(err)
    }
  }

  // Force the user to login again.
  if (!valid) {
    delete window.localStorage[sessionLocalPropertyName]
    window.editableViewBus.$emit('login')
  } else {
    // Enable the editable view (if not already).
    window.editableViewBus.$emit('setEditable', true)
  }

  return valid
}

const login = async function(password) {
  const data = {
    password: password
  }

  try {
    return await Vue.http
      .post(process.env.API_URL + '/api/authentication/login', data)
      .then(
        response => {
          // Store session key and update local cache.
          sessionKey = response.body
          window.localStorage[sessionLocalPropertyName] = JSON.parse(
            JSON.stringify(sessionKey)
          )
        },
        error => {
          if (error.status === 401 || error.status === 403) {
            throw new Error(error.bodyText)
          } else {
            console.log('Error while connect to server with error. ')
            console.log(JSON.stringify(error))
            throw new Error(
              'Something went wrong while try to connect the server.'
            )
          }
        }
      )
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const logout = async function() {
  // Make sure to have a running session.
  if (!(await validateSession())) {
    return
  }

  const data = {
    sessionKey: sessionKey
  }

  try {
    await Vue.http
      .post(process.env.API_URL + '/api/authentication/logout', data)
      .then(
        response => {
          // Clear stored/cached session key.
          sessionKey = null
          delete window.localStorage[sessionLocalPropertyName]
        },
        error => {
          throw new Error(error.bodyText)
        }
      )
  } catch (err) {
    console.log(err)
  }
}

const uploadFile = async (path, file) => {
  // Make sure to have a running session.
  if (!(await validateSession())) {
    return
  }

  const data = new FormData()
  data.append('sessionKey', sessionKey)
  data.append('mediaPath', path)
  data.append('mediaFile', file)

  try {
    await Vue.http
      .put(process.env.API_URL + '/api/editor/uploadFile', data)
      .then(
        response => {},
        error => {
          throw new Error(error.bodyText)
        }
      )
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const updateConfig = async (key, config) => {
  // Make sure to have a running session.
  if (!(await validateSession())) {
    return
  }

  const data = {
    sessionKey: sessionKey,
    dataKey: key,
    dataObject: config
  }

  try {
    await Vue.http
      .put(process.env.API_URL + '/api/editor/updateConfig', data)
      .then(
        response => {
          console.log('Data for key ' + key + ' has been successfully updated.')
          // Nothing to do.
        },
        error => {
          console.log(
            'Data for key ' +
              key +
              ' was not sucessfully updated due to an error by the backend.'
          )
          throw new Error(error.bodyText)
        }
      )
  } catch (err) {
    console.log(
      'Data for key ' +
        key +
        ' was not sucesfully updated due to an error while connecting the backend.'
    )
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const build = async function() {
  // Make sure to have a running session.
  if (!(await validateSession())) {
    return
  }

  const data = {
    sessionKey: sessionKey
  }

  try {
    await Vue.http.put(process.env.API_URL + '/api/editor/save', data).then(
      response => {
        console.log('saved')
      },
      error => {
        if (error.status === 401) {
          throw new Error('Wrong password')
        } else {
          console.log('Error while connect to server with error. ')
          console.log(JSON.stringify(error))
          throw new Error(
            'Something went wrong while try to connect the server.'
          )
        }
      }
    )
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const sendFeedback = async function(payload) {
  try {
    await Vue.http.post(process.env.API_URL + '/api/mail', payload).then(
      response => {
        console.log('Feedback send successfully.')
        console.log(response)
      },
      error => {
        console.log('Failed to send feedback!')
        console.log(error)
        console.log('error end')
      }
    )
  } catch (err) {
    console.log('Try-error')
    console.log(err)
  }
}

export default {
  validateSession: validateSession,
  login: login,
  logout: logout,
  upload: uploadFile,
  update: updateConfig,
  build: build,
  sendFeedback: sendFeedback
}
