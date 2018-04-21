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

  // Edit Window
  [keys.EDIT_WINDOW_TITLE]: ['Bearbeiten', 'Edit'],
  [keys.EDIT_WINDOW_BTN_OK]: ['OK'],
  [keys.EDIT_WINDOW_HINT_MULTILINE]: {
    [langs.DE]: 'Das Eroeffnen einer Zeile erscheint ebenfalls im Orginal.',
    [langs.EN]: 'Start a new line will also be displayed in the original.'
  },
  [keys.EDIT_WINDOW_HINT_ABORT]: {
    [langs.DE]: 'Alle Aenderungen koennen zurueckgesetzt werden durch Klicken des Schliessbuttons or ausserhalb des Fensters.',
    [langs.EN]: 'All changes can be reset by click the close button or outsite of the window.'
  },

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
  // About Us
  [keys.SUBPAGE_ABOUT_US_HEADER]: ['Über Uns', 'About Us'],
  [keys.SUBPAGE_ABOUT_US_SALON_HEADER]: ['Unser Salon', 'The Parlor'],
  [keys.SUBPAGE_ABOUT_US_AVEDA_HEADER]: ['Aveda Mission'],

  // Colors
  [keys.SUBPAGE_COLORS_HEADER]: ['AVEDA Haarfarben', 'AVEDA Colors'],
  [keys.SUBPAGE_COLORS_POSSIBILITIES_HEADER]: ['Entdecke die Möglichkeiten', 'Discover the Potential'],
  [keys.SUBPAGE_COLORS_IMPACT_HEADER]: ['Die Wirkungsweise', 'How It Works'],
  [keys.SUBPAGE_COLORS_OLAPLEX_HEADER]: ['Olaplex'],

  // Contact
  [keys.SUBPAGE_CONTACT_HEADER]: ['Kontakt', 'Contact'],
  [keys.SUBPAGE_CONTACT_BTN_MAP]: ['Karte', 'Map'],
  [keys.SUBPAGE_CONTACT_BTN_SEND]: ['Abschicken', 'Map'],
  [keys.SUBPAGE_CONTACT_PH_NAME]: ['Name', 'name'],
  [keys.SUBPAGE_CONTACT_PH_MAIL]: ['E-Mail', 'e-mail'],
  [keys.SUBPAGE_CONTACT_PH_PHONE]: ['Telefonnummer', 'phone number'],
  [keys.SUBPAGE_CONTACT_PH_MESSAGE]: ['Nachricht', 'message'],

  // Products
  [keys.SUPPAGE_PRODUCTS_PRODUCTS_GENERAL]: ['Allgemeine Produkte', 'General Products'],
  [keys.SUPPAGE_PRODUCTS_PRODUCTS_HIM]: ['Produkte für Ihn', 'Products for him'],

  // Costs
  [keys.SUBPAGE_COSTS_HEADER]: ['Preisliste für Haarschnitte und Stylings', 'Prices for Haircuts and Styling'],
  [keys.SUBPAGE_COSTS_LABEL_SHE]: ['Preise für Sie', 'Prices for her'],
  [keys.SUBPAGE_COSTS_LABEL_HE]: ['Preise für Ihn', 'Prices for him'],
  [keys.SUBPAGE_COSTS_LABEL_COLORS]: ['Preise für Farbveränderungen', 'Prices for colors'],

  // Greeter

  // Impressum
  [keys.SUBPAGE_IMPRESSUM_HEADER]: ['Impressum'],

  // Promotion
  [keys.SUBPAGE_PROMOTION_HEADER]: ['Angebote', 'Promotion'],

  // Recension
  [keys.SUBPAGE_RECENSION_HEADER]: ['Das denken Kunden über uns:', 'What people say about us:'],

  // Staff
  [keys.SUBPAGE_STAFF_HEADER]: ['Unser Team', 'The Team'],
  [keys.SUBPAGE_STAFF_SUBHEADER]: {
    [langs.DE]: 'Dich noch schöner zu machen ist unser Ziel!',
    [langs.EN]: 'Make you even more pretty is our goal!'
  },
  [keys.SUBPAGE_STAFF_HOURS]: ['Arbeitszeit', 'Working Hours']
}
