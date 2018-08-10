import Vue from 'vue'

// Globally store the session key for further calls.
let sessionKey = null

const login = async function(password) {
  const data = {
    password: password
  }

  try {
    return await Vue.http
      .post('https://localhost:8081/api/authentication/login', data)
      .then(
        response => {
          sessionKey = response.body
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
  const data = {
    sessionKey: sessionKey
  }

  try {
    await Vue.http
      .post('https://localhost:8081/api/authentication/logout', data)
      .then(
        response => {
          // Nothing to do.
        },
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

const uploadFile = async (path, file) => {
  const data = new FormData()
  data.append('sessionKey', sessionKey)
  data.append('mediaPath', path)
  data.append('mediaFile', file)

  try {
    await Vue.http
      .put('https://localhost:8081/api/editor/uploadFile', data)
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
  console.log('update')

  const data = {
    sessionKey: sessionKey,
    dataKey: key,
    dataObject: config
  }

  try {
    await Vue.http
      .post('https://localhost:8081/api/editor/updateConfig', data)
      .then(
        response => {
          console.log('alles gut')
          // Nothing to do.
        },
        error => {
          console.log('nicht gut')
          throw new Error(error.bodyText)
        }
      )
  } catch (err) {
    console.log('gar nicht gut')
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const save = async function() {
  console.log('save')

  const data = {
    sessionKey: sessionKey
  }

  try {
    await Vue.http.put('https://localhost:8081/api/editor/save', data).then(
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
    await Vue.http.post('https://localhost:8081/api/mail', payload).then(
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
  login: login,
  logout: logout,
  upload: uploadFile,
  update: updateConfig,
  save: save,
  sendFeedback: sendFeedback
}
