function stampString (value) {
  value = value.replace(':', '')
  value = value.replace('-', '')
  value = value.replace(' ', '')
  value = value.toLowerCase()
  return value
}

export default {
  install (Vue) {
    Vue.prototype.$staffFilter = {}
    Vue.prototype.$staffFilter.kategorie = ''

    Vue.prototype.$staffFilter.setStaffFilter = value => {
      const filter = stampString(value)
      Vue.prototype.$staffFilter.kategorie = filter
    }

    Vue.prototype.$staffFilter.checkStaff = staff => {
      const kategorie = stampString(staff.kategorie)

      if (Vue.prototype.$staffFilter.kategorie) {
        return kategorie.indexOf(Vue.prototype.$staffFilter.kategorie) !== -1
      } else {
        return true
      }
    }
  }
}
