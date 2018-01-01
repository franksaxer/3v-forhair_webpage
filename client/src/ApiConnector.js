import Vue from 'vue'

const login = async function (password) {
  const data = {password: password}

  try {
    return await Vue.http.post('https://localhost:8081/api/authentication/login', data).then(response => {
      if (response.status === 200) {
        return response.body
      } else if (response.status === 401) {
        throw new Error('Wrong password')
      } else {
        console.log('Error while connect to server. Response: ' + response.status + ' - ' + response.body)
        throw new Error('Something went wrong while try to connect the server.')
      }
    }, error => {
      console.log('Error while connect to server. Response: ')
      console.log(JSON.stringify(error))
      throw new Error(error.bodyText)
    })
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const logout = async function (sessionKey) {
  const data = {sessionKey: sessionKey}

  try {
    await Vue.http.post('https://localhost:8081/api/authentication/logout', data).then(response => {
      // Nothing to do.
    }, error => {
      throw new Error(error.bodyText)
    })
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const uploadFile = async function (path, file) {
  console.log('upload')
  const data = new FormData()
  data.append('mediaPath', path)
  data.append('mediaFile', file)

  try {
    await Vue.http.put('https://localhost:8081/api/editor/uploadFile', data).then(response => {
    }, error => {
      console.log('huhu')
      throw new Error(error.bodyText)
    })
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

const save = async function () {
  console.log('save')
  try {
    await Vue.http.put('https://localhost:8081/api/editor/save').then(response => {
      // Nothin to do.
    }, error => {
      throw new Error(error.bodyText)
    })
  } catch (err) {
    console.log(err)
    // Just forward the error.
    throw err
  }
}

export default {
  login: login,
  logout: logout,
  upload: uploadFile,
  save: save
}
