// Import the language list and the label keys.
import * as langs from '../enums/Languages'
import * as keys from '../enums/LabelKeys'

/*
 * Define the translations for all label keys for each (or a subset) language.
 *
 * Conventions:
 *  - After object notation, an empty line follows to have a better separation and view.
 *  - Long translations should use the object notation.
 *  - Sections are marked by a comment above.
 */
export default {
  // Auth
  [keys.AUTH_MSG_DESCRIPTION]: {
    [langs.DE]: 'Bitte authentifizieren sie sich als Administrator, um in den Bearbeitunsgmodus zu gelangen.',
    [langs.EN]: 'Please insert the administrator password, to access the editable view!'
  },

  [keys.AUTH_INPUT_PH_PWD]: ['Passwort', 'password'],
  [keys.AUTH_BTN_LOGIN]: ['Anmelden', 'Login'],
  [keys.AUTH_BTN_LOGOUT]: ['Abmelden', 'Logout'],

  // Edit
  [keys.EDIT_IMG_BTN_DRAG]: ['Bild bewegen', 'Move image'],
  [keys.EDIT_IMG_BTN_BORDER]: ['Kante bewegen', 'Move border'],
  [keys.EDIT_MSG_UPLOAD]: ['Bild hochladen', 'Upload image'],

  // Menu
  [keys.MENU_ENTRY_WELCOME]: ['Willkommen', 'Welcome'],
  [keys.MENU_ENTRY_RECENSION]: ['Rezensionen', 'Recension'],
  [keys.MENU_ENTRY_INFOS]: ['Weitere Infos', 'More Infos'],
  [keys.MENU_ENTRY_ABOUT_US]: ['Ueber Uns', 'About Us'],
  [keys.MENU_ENTRY_STAFF]: ['Stylisten', 'Stylists'],
  [keys.MENU_ENTRY_COSTS]: ['Preise', 'Costs'],
  [keys.MENU_ENTRY_COLORS]: ['Farben', 'Colors'],
  [keys.MENU_ENTRY_PRODUCTS]: ['Produkte', 'Products'],
  [keys.MENU_ENTRY_CONTACT]: ['Kontakt', 'Contact'],
  [keys.MENU_ENTRY_APPROACH]: ['Anfahrt', 'Approach'],
  [keys.MENU_ENTRY_IMPRESSIONS]: ['Bilder', 'Pictures'],
  [keys.MENU_ENTRY_IMPRESSUM]: ['Impressum', 'Impressum']
}
