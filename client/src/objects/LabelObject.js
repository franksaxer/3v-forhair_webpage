import {LanguageEnum} from '../enums/LanguageEnum'

/**
 * Constructor for a new label with multiple languages.
 * The English text is required. For safety it will be set to an empty String, if not.
 * Optional languages are set to the english text, if not given.
 *
 * @param englishText {String}
 *        The text for the label in English. (required)
 *
 * @param germanText {String}
 *        The text for the label in German. (optional)
 *
 * @constructor
 */
const Label = function (englishText, germanText) {
  // Set text to empty if no english given.
  if (!englishText) englishText = ''

  // Set english text.
  this[LanguageEnum.english] = englishText

  // Check if the german text is given. If not set to the english one.
  if (germanText) this[LanguageEnum.german] = germanText
  else this[LanguageEnum.german] = englishText
}

export {Label}
