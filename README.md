# `<vellum-random-table>`

Web component for interactive random tables.

**[Demo](https://grislyeye.github.io/vellum-random-table/)**

| Attribute | Description                                              |
| --------- | -------------------------------------------------------- |
| `select`  | CSS selector for the container/input to display results. |

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

Two-column table where items are selected by a dice roll:

```html
<vellum-random-table select="#result">
  <caption>
    Random Encounters
  </caption>
  <table>
    <thead>
      <tr>
        <th>d6</th>
        <th>Encounter</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1-3</td>
        <td>1 wolf</td>
      </tr>
      <tr>
        <td>4-5</td>
        <td>2 goblins</td>
      </tr>
      <tr>
        <td>6</td>
        <td>dragon</td>
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
