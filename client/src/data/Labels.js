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
  [keys.MENU_ENTRY_ABOUT_US]: ['Ueber Uns', 'About Us'],
  [keys.MENU_ENTRY_COLORS]: ['Farben', 'Colors'],
  [keys.MENU_ENTRY_CONTACT]: ['Kontakt', 'Contact'],
  [keys.MENU_ENTRY_COSTS]: ['Preise', 'Costs'],
  [keys.MENU_ENTRY_GREETER]: ['Willkommen', 'Welcome'],
  [keys.MENU_ENTRY_IMPRESSUM]: ['Impressum', 'Impressum'],
  [keys.MENU_ENTRY_PRODUCTS]: ['Produkte', 'Products'],
  [keys.MENU_ENTRY_PROMOTION]: ['Angebote', 'Promotion'],
  [keys.MENU_ENTRY_RECENSION]: ['Rezensionen', 'Recension'],
  [keys.MENU_ENTRY_STAFF]: ['Stylisten', 'Stylists'],

  // Subpages
  // Greeter
  [keys.SUBPAGE_GREETER_HEADER]: {
    [langs.DE]: 'Genieße eine Sinnesreise auf dem Pfad deines ayurvedischen Elements.',
    [langs.EN]: 'TBD'
  },

  [keys.SUBPAGE_GREETER_CONTENT]: {
    [langs.DE]: 'Vergesse den Stress des Alltags bei einer "Anti-Stress"-Kopfmassage oder entspanne bei einer "Hands-on"-Handmassage. Dich noch schöner zu machen, deine Individualität zu betonen und dir dabei den Aufenthalt so angenehm wie möglich zu gestalten, das ist unser Ziel. Wir nehmen uns noch Zeit für dich und beraten dich gerne. Am Ende entscheidest du selbst, mit welchem neuen Look und/oder welcher Haarfarbe du dein neues Ich erfährst. Wir haben uns ganz gezielt für die Produkte von Aveda entschieden, weil wir auf höchstem Niveau arbeiten und uns unserer umweltpolitischen Verantwortung bewusst sind. Die Produkte von Aveda verbinden höchsten Anspruch und neueste Entwicklungen mit altbewährten Traditionen von Naturvölkern unterschiedlichster Herkunft. Die fast ausschließlich pflanzlichen Rohstoffe werden weitestgehend ökologisch angebaut und schonend verarbeitet. Dies geschieht zum Wohle von Mensch, Tier und Natur. Doch erfahre es selbst und buche noch heute deinen Termin.',
    [langs.EN]: 'TBD'
  }
}
