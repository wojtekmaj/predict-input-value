[![npm](https://img.shields.io/npm/v/@wojtekmaj/predict-input-value.svg)](https://www.npmjs.com/package/@wojtekmaj/predict-input-value) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/predict-input-value.svg) ![CI](https://github.com/wojtekmaj/predict-input-value/workflows/CI/badge.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# predict-input-value
Predicts the input value during KeyDown or KeyPress events, before the input is actually changed.

## tl;dr
* Install by executing `npm install @wojtekmaj/predict-input-value` or `yarn add @wojtekmaj/predict-input-value`.
* Import by adding `import predictInputValue from '@wojtekmaj/predict-input-value'`.
* Use it by writing `const nextValue = predictInputValue(event)`.

## Example

Conditions:

* Input: value `"hello"`
* Selected text: `"ello"`
* Key pressed: `i`

```js
function onKeyPress(event) {
  const nextValue = predictInputValue(event); // "hi"
}
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
