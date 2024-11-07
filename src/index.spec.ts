import { beforeEach, describe, expect, it } from 'vitest';

import predictInputValue from './index.js';

describe('predictInputValue()', () => {
  let eventTarget: HTMLInputElement;
  let targetWithCaretAfterThirdLetter: HTMLInputElement;
  let targetWithSecondLetterSelected: HTMLInputElement;
  let targetWithCaretAfterLastLetter: HTMLInputElement;

  beforeEach(() => {
    eventTarget = document.createElement('input');
    eventTarget.value = 'hello';
    eventTarget.selectionStart = 0;
    eventTarget.selectionEnd = 0;

    targetWithCaretAfterThirdLetter = document.createElement('input');
    targetWithCaretAfterThirdLetter.value = 'hello';
    targetWithCaretAfterThirdLetter.selectionStart = 3;
    targetWithCaretAfterThirdLetter.selectionEnd = 3;

    targetWithSecondLetterSelected = document.createElement('input');
    targetWithSecondLetterSelected.value = 'hello';
    targetWithSecondLetterSelected.selectionStart = 1;
    targetWithSecondLetterSelected.selectionEnd = 2;

    targetWithCaretAfterLastLetter = document.createElement('input');
    targetWithCaretAfterLastLetter.value = 'hello';
    targetWithCaretAfterLastLetter.selectionStart = 5;
    targetWithCaretAfterLastLetter.selectionEnd = 5;
  });

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

      expect.assertions(1);

      eventTarget.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('hello');
      });

      eventTarget.dispatchEvent(event);
    });

    it('predicts value if Backspace is pressed in the middle of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      expect.assertions(1);

      targetWithCaretAfterThirdLetter.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('helo');
      });

      targetWithCaretAfterThirdLetter.dispatchEvent(event);
    });

    it('predicts value if Backspace is pressed at the end of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      expect.assertions(1);

      targetWithCaretAfterLastLetter.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('hell');
      });

      targetWithCaretAfterLastLetter.dispatchEvent(event);
    });

    it('predicts value if Backspace is pressed when text is selected', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
      });

      expect.assertions(1);

      targetWithSecondLetterSelected.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('hllo');
      });

      targetWithSecondLetterSelected.dispatchEvent(event);
    });

    it('predicts value if a letter is typed at the beginning of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      expect.assertions(1);

      eventTarget.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('ahello');
      });

      eventTarget.dispatchEvent(event);
    });

    it('predicts value if a letter is typed in the middle of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      expect.assertions(1);

      targetWithCaretAfterThirdLetter.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('helalo');
      });

      targetWithCaretAfterThirdLetter.dispatchEvent(event);
    });

    it('predicts value if a letter is typed at the end of the field', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      expect.assertions(1);

      targetWithCaretAfterLastLetter.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('helloa');
      });

      targetWithCaretAfterLastLetter.dispatchEvent(event);
    });

    it('predicts value if a letter is typed when text is selected', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      expect.assertions(1);

      targetWithSecondLetterSelected.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('hallo');
      });

      targetWithSecondLetterSelected.dispatchEvent(event);
    });

    it('predicts value if a letter is typed, but maxLength has been reached', () => {
      targetWithCaretAfterLastLetter.maxLength = 5;

      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });

      expect.assertions(1);

      targetWithCaretAfterLastLetter.addEventListener('keydown', () => {
        expect(predictInputValue(event)).toBe('hello');
      });

      targetWithCaretAfterLastLetter.dispatchEvent(event);
    });
  });
});
