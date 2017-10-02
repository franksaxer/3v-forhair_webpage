import Vue from 'vue'

const authenticate = async function (password) {
  const data = {password: password}

  try {
    const response = await Vue.http.post('https://localhost:8081/api/authentication/login', data).then(response => {
      if (response.status === 200) {
        console.log('Response: ' + response.body)
        return response.body
      } else {
        console.log('Error while connect to server. Response: ' + response.status + ' - ' + response.body)
        throw new Error('Something went wrong while try to connect the server.')
      }
    }, error => {
      console.log(error)
      throw new Error('Could not connect to the server.')
    })

    return response
  } catch (err) {
    // Just forward the error.
    throw err
  }
}

export default {
  authenticate: authenticate
}
