[![npm](https://img.shields.io/npm/v/@wojtekmaj/predict-input-value.svg)](https://www.npmjs.com/package/@wojtekmaj/predict-input-value) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/predict-input-value.svg) [![CI](https://github.com/wojtekmaj/predict-input-value/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/predict-input-value/actions)

# Predict-Input-Value

Predicts the input value during KeyDown or KeyPress events, before the input is actually changed.

## tl;dr

- Install by executing `npm install @wojtekmaj/predict-input-value` or `yarn add @wojtekmaj/predict-input-value`.
- Import by adding `import predictInputValue from '@wojtekmaj/predict-input-value'`.
- Use it by writing `const nextValue = predictInputValue(event)`.

## Example

Conditions:

- Input: value `"hello"`
- Selected text: `"ello"`
- Key pressed: `i`

```ts
function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
  const nextValue = predictInputValue(event); // "hi"
}
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
