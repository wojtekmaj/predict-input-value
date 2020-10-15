const excludeList = [
  'Alt',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'Enter',
  'Escape',
  'Shift',
  'Tab',
];

/**
 * Predicts what the value will be after the next keyup given keydown event.
 *
 * @param {KeyboardEvent} event Keydown event
 * @returns {string} Predicted input value
 */
export default function predictInputValue(event) {
  // Support only keydown and keypress event
  if (event.type !== 'keydown' && event.type !== 'keypress') {
    return null;
  }

  // Skip Cmd+A and other key combinations
  if (event.metaKey) {
    return null;
  }

  if (excludeList.includes(event.key)) {
    return null;
  }

  const { target: element } = event;

  // We can’t predict values in number inputs
  if (element.type === 'number') {
    return null;
  }

  let { selectionStart } = element;
  const { selectionEnd } = element;

  const nextValueArr = element.value.split('');
  let { key: replaceWith } = event;

  if (event.key === 'Backspace') {
    if (selectionStart && selectionStart === selectionEnd) {
      /**
       * There’s no text selected, so pressing backspace will remove the character before the caret.
       * That’s equal to one character before the caret being selected when Backspace is pressed.
       */
      selectionStart -= 1;
    }
    replaceWith = '';
  }

  /**
   * If we’re going to add another character, check if we’re not going over the limit set by
   * maxLength. If so, entering the next character will fail, and thus, nextValue will be equal to
   * value.
   */
  if (!replaceWith || element.maxLength < 0 || nextValueArr.length < element.maxLength) {
    nextValueArr.splice(selectionStart, selectionEnd - selectionStart, replaceWith);
  }

  return nextValueArr.join('');
}
