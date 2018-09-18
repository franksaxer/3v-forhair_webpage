module.exports = Object.freeze({
  ADMIN: '/admin',
  AUTH: {
    BASE: '/api/authentication',
    LOGIN: '/login',
    CHECK: '/check',
    LOGOUT: '/logout'
  },
  EDITOR: {
    BASE: '/api/editor',
    UPDATE: '/updateConfig',
    UPLOAD: '/uploadFile',
    SAVE: '/save'
  },
  MAIL: {
    BASE: '/api/mail',
    SEND: '/'
  }
})
