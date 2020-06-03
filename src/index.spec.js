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
        target: {
          ...defaultEvent.target,
          selectionStart: 1,
          selectionEnd: 1,
        },
      };

      expect(predictInputValue(event)).toBe('ello');
    });

    it('predicts value if Backspace is pressed when text is selected', () => {
      const event = {
        ...defaultEvent,
        key: 'Backspace',
        target: {
          ...defaultEvent.target,
          selectionStart: 1,
          selectionEnd: 2,
        },
      };

      expect(predictInputValue(event)).toBe('hllo');
    });

    it('predicts value if a letter is typed at the end of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: {
          ...defaultEvent.target,
          selectionStart: 5,
          selectionEnd: 5,
        },
      };

      expect(predictInputValue(event)).toBe('helloa');
    });

    it('predicts value if a letter is typed in the middle of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: {
          ...defaultEvent.target,
          selectionStart: 3,
          selectionEnd: 3,
        },
      };

      expect(predictInputValue(event)).toBe('helalo');
    });

    it('predicts value if a letter is typed in the middle of the field', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: {
          ...defaultEvent.target,
          selectionStart: 3,
          selectionEnd: 3,
        },
      };

      expect(predictInputValue(event)).toBe('helalo');
    });

    it('predicts value if a letter is typed, but maxLength has been reached', () => {
      const event = {
        ...defaultEvent,
        key: 'a',
        target: {
          ...defaultEvent.target,
          maxLength: 5,
          selectionStart: 5,
          selectionEnd: 5,
        },
      };

      expect(predictInputValue(event)).toBe('hello');
    });
  });
});
