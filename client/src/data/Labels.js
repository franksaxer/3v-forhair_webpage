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
    [langs.EN]: 'Please insert the administrator password, to access the editable view!',
    [langs.DE]: 'Bitte authentifizieren sie sich als Administrator, um in den Bearbeitunsgmodus zu gelangen.'
  },

  [keys.AUTH_MSG_INVALID_PWD]: {
    [langs.EN]: 'Invalid Password!',
    [langs.DE]: 'Ungueltiges Passwort!'
  },

  [keys.AUTH_INPUT_PH_PWD]: ['password', 'Passwort'],

  [keys.AUTH_BTN_LOGIN]: ['Login', 'Anmelden'],

  [keys.AUTH_BTN_LOGOUT]: ['Logout', 'Abmelden']
}
