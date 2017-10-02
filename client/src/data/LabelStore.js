/* Import all necessary modules */
import {Label} from '../objects/LabelObject' // The label object with its constructor.

/**
 * The store contains all defined Lables.
 * They can be accessed as attributed of the LabelStore object.
 */
const LabelStore = {
  authentication_description: new Label('Please insert the administration password to access the admin view.', 'Biite geben authentifizieren sie sich als Administrator, um zur Admin-View zu gelangen.'),
  authentication_passwordPlaceholder: new Label('password', 'Passwort'),
  authentication_button: new Label('Authenticate', 'Authentifizieren'),
  authentication_invalidPassword: new Label('Invalid password!', 'Ungültiges Passwort!'),
  authentication_problem: new Label('Something went wrong while try to connect to the server!', 'Etwas ist schief gelaufen, beim Versuch den Server zu kontaktieren!')

}

// Define what should be exported.
export default LabelStore
