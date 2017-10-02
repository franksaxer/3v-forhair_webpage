/* Import all necessary modules */
import {Label} from '../objects/LabelObject' // The label object with its constructor.

/**
 * The store contains all defined Lables.
 * They can be accessed as attributed of the LabelStore object.
 */
const LabelStore = {
  example: new Label('example', 'Beispiel')
}

// Define what should be exported.
export default LabelStore
