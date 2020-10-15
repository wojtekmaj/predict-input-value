import predictInputValue from './index';

describe('predictInputValue()', () => {
  const defaultEvent = {
    key: 'a',
    metaKey: false,
    target: {
      maxLength: -1,
      selectionEnd: 0,
      selectionStart: 0,
      type: 'text',
      value: 'hello',
    },
    type: 'keydown',
  };

  const targetWithCaretAfterThirdLetter = {
    ...defaultEvent.target,
    selectionStart: 3,
    selectionEnd: 3,
  };

  const targetWithSecondLetterSelected = {
    ...defaultEvent.target,
    selectionStart: 1,
    selectionEnd: 2,
  };

  const targetWithCaretAfterLastLetter = {
    ...defaultEvent.target,
    selectionStart: 5,
    selectionEnd: 5,
  };

  it('returns null for unsupported events', () => {
    const event = {
      ...defaultEvent,
      type: 'keyup',
    };

    expect(predictInputValue(event)).toBe(null);
  });

  it('returns null for meta keys', () => {
    const event = {
      ...defaultEvent,
      metaKey: true,
    };

    expect(predictInputValue(event)).toBe(null);
  });

  it('returns null for input type = "number"', () => {
    const event = {
      ...defaultEvent,
      target: {
        ...defaultEvent.target,
        type: 'number',
      },
    };

    expect(predictInputValue(event)).toBe(null);
  });

  describe('predicts value properly', () => {
    it('predicts value if Backspace is pressed at the beginning of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'Backspace',
      };

      expect(predictInputValue(event)).toBe('hello');
    });

    it('predicts value if Backspace is pressed in the middle of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'Backspace',
        target: targetWithCaretAfterThirdLetter,
      };

      expect(predictInputValue(event)).toBe('helo');
    });

    it('predicts value if Backspace is pressed at the end of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'Backspace',
        target: targetWithCaretAfterLastLetter,
      };

      expect(predictInputValue(event)).toBe('hell');
    });

    it('predicts value if Backspace is pressed when text is selected', () => {
      const event = {
        ...defaultEvent,
        key: 'Backspace',
        target: targetWithSecondLetterSelected,
      };

      expect(predictInputValue(event)).toBe('hllo');
    });

    it('predicts value if a letter is typed at the beginning of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
      };

      expect(predictInputValue(event)).toBe('ahello');
    });

    it('predicts value if a letter is typed in the middle of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: targetWithCaretAfterThirdLetter,
      };

      expect(predictInputValue(event)).toBe('helalo');
    });

    it('predicts value if a letter is typed at the end of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: targetWithCaretAfterLastLetter,
      };

      expect(predictInputValue(event)).toBe('helloa');
    });

    it('predicts value if a letter is typed when text is selected', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: targetWithSecondLetterSelected,
      };

      expect(predictInputValue(event)).toBe('hallo');
    });

    it('predicts value if a letter is typed, but maxLength has been reached', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: {
          ...targetWithCaretAfterLastLetter,
          maxLength: 5,
        },
      };

      expect(predictInputValue(event)).toBe('hello');
    });
  });
});
