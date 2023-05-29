import { describe, expect, it } from 'vitest';
import predictInputValue from './index.js';

describe('predictInputValue()', () => {
  const eventTarget = document.createElement('input');
  eventTarget.value = 'hello';
  eventTarget.selectionStart = 0;
  eventTarget.selectionEnd = 0;

  const targetWithCaretAfterThirdLetter = document.createElement('input');
  targetWithCaretAfterThirdLetter.value = 'hello';
  targetWithCaretAfterThirdLetter.selectionStart = 3;
  targetWithCaretAfterThirdLetter.selectionEnd = 3;

  const targetWithSecondLetterSelected = document.createElement('input');
  targetWithSecondLetterSelected.value = 'hello';
  targetWithSecondLetterSelected.selectionStart = 1;
  targetWithSecondLetterSelected.selectionEnd = 2;

  const targetWithCaretAfterLastLetter = document.createElement('input');
  targetWithCaretAfterLastLetter.value = 'hello';
  targetWithCaretAfterLastLetter.selectionStart = 5;
  targetWithCaretAfterLastLetter.selectionEnd = 5;

  it('returns null for unsupported events', () => {
    const event = new KeyboardEvent('keyup');

    expect(predictInputValue(event)).toBe(null);
  });

  it('returns null for meta keys', () => {
    const event = new KeyboardEvent('keydown', {
      metaKey: true,
    });

    expect(predictInputValue(event)).toBe(null);
  });

  it('returns null for meta keys in keydown events', () => {
    const event = new KeyboardEvent('keydown', {
      metaKey: false,
      key: 'ArrowLeft',
    });

    expect(predictInputValue(event)).toBe(null);
  });

  it('returns null for input type = "number"', () => {
    const eventTarget = document.createElement('input');
    eventTarget.type = 'number';

    const event = new KeyboardEvent('keydown');

    eventTarget.dispatchEvent(event);

    expect(predictInputValue(event)).toBe(null);
  });

  describe('predicts value properly', () => {
    it('predicts value if Backspace is pressed at the beginning of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      eventTarget.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('hello');
    });

    it('predicts value if Backspace is pressed in the middle of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      targetWithCaretAfterThirdLetter.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('helo');
    });

    it('predicts value if Backspace is pressed at the end of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      targetWithCaretAfterLastLetter.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('hell');
    });

    it('predicts value if Backspace is pressed when text is selected', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      targetWithSecondLetterSelected.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('hllo');
    });

    it('predicts value if a letter is typed at the beginning of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      eventTarget.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('ahello');
    });

    it('predicts value if a letter is typed in the middle of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      targetWithCaretAfterThirdLetter.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('helalo');
    });

    it('predicts value if a letter is typed at the end of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      targetWithCaretAfterLastLetter.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('helloa');
    });

    it('predicts value if a letter is typed when text is selected', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      targetWithSecondLetterSelected.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('hallo');
    });

    it('predicts value if a letter is typed, but maxLength has been reached', () => {
      targetWithCaretAfterLastLetter.maxLength = 5;

      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      targetWithCaretAfterLastLetter.dispatchEvent(event);

      expect(predictInputValue(event)).toBe('hello');
    });
  });
});
