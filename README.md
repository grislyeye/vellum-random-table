# `<vellum-random-table>`

Web component for interactive random tables.

**[Demo](https://grislyeye.github.io/vellum-random-table/)**

### Examples

Simple, one-column table (elements are selected at random with equal weight):

```html
<vellum-random-table select="#result">
  <caption>
    Random Encounters
  </caption>
  <table>
    <thead>
      <tr>
        <th>Encounter</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1 wolf</td>
      </tr>
      <tr>
        <td>2 goblins</td>
      </tr>
    </tbody>
  </table>
  <button>Roll</button>
  <input id="result" type="text" />
</vellum-random-table>
```

## Installation

Install via [npm](https://www.npmjs.com/package/@daviddarnes/component-name): `npm i vellum-random-table -S`.

### Usage

Include the `<script>` in your project:

```html
<script type="module" src="vellum-random-table.js"></script>
```
