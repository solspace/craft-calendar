/**
 * Replaces all occurrences of the replacements array in the string
 *
 * @param string
 * @param replacements
 * @returns {*}
 */
export const replace = (string, replacements = {}) => {
  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`\{${key}\}`, 'g');
    string = string.replace(pattern, value);
  }

  return string;
};

/**
 * Translates messages using Craft's translator
 *
 * @param message
 * @param replacements
 * @returns {*}
 */
export const translate = (message, replacements = {}) => {
  if (typeof Craft !== 'undefined') {
    return Craft.t('calendar', message, replacements);
  }

  return replace(message, replacements);
};

export default translate;
