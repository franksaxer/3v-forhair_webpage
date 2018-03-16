// Import the language list and the label keys.
import * as langs from '../enums/Languages'
import * as keys from '../enums/LabelKeys'

/*
 * Define the translations for all label keys for each (or a subset) language.
 *
 * Conventions:
 *  - After each label, an empty line follows to have a better separation and view.
 *  - Long translations should use the object notation.
 */
export default {
  [keys.AUTH_MSG_DESCRIPTION]: {
    [langs.DE]: 'Bitte authentifizieren sie sich als Administrator, um in den Bearbeitunsgmodus zu gelangen.',
    [langs.EN]: 'Please insert the administrator password, to access the editable view!'
  },

  [keys.AUTH_MSG_INVALID_PWD]: {
    [langs.DE]: 'Ungueltiges Passwort!',
    [langs.EN]: 'Invalid Password!'
  },

  [keys.AUTH_INPUT_PH_PWD]: ['Passwort', 'password'],

  [keys.AUTH_BTN_LOGIN]: ['Anmelden', 'Login'],

  [keys.AUTH_BTN_LOGOUT]: ['Abmelden', 'Logout']
}
