# `<vellum-random-table>`

Web component for interactive random tables.

**[Demo](https://grislyeye.github.io/vellum-random-table/)**

| Attribute  | Description                                                                        | Default |
| ---------- | ---------------------------------------------------------------------------------- | ------- |
| `select`   | The container/input to display roll results, identified by a CSS selector.         |         |
| `preroll`  | Load table with pre-rolled result.                                                 | `false` |
| `hideroll` | Hide rolls and just display the results.                                           | `false` |
| `hidecalc` | Show rolls but hides calculations (i.e. `1 + 4`). Ignore when `hideroll == false`. | `false` |

### Examples

Simple, one-column table (elements are selected at random with equal weight):

```html
<vellum-random-table select="#result" preroll hideroll>
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
        <th>2d4+1</th>
        <th>Encounter</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>3-5</td>
        <td>1 wolf</td>
      </tr>
      <tr>
        <td>6-8</td>
        <td>2 goblins</td>
      </tr>
      <tr>
        <td>9</td>
        <td>dragon</td>
      </tr>
    </tbody>
  </table>
  <button>Roll</button>
  <input id="result" type="text" />
</vellum-random-table>
```

Two-column table where items are selected by a d66:

```html
<vellum-random-table select="#result" hidecalc>
  <caption>
    Random Encounters
  </caption>
  <table>
    <thead>
      <tr>
        <th>d66</th>
        <th>Encounter</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>11-46</td>
        <td>1 wolf</td>
      </tr>
      <tr>
        <td>51-65</td>
        <td>2 goblins</td>
      </tr>
      <tr>
        <td>66</td>
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
