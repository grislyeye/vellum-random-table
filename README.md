# `<vellum-random-table>` [![Lint](https://github.com/grislyeye/vellum-random-table/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/grislyeye/vellum-random-table/actions/workflows/lint-and-test.yml)

Web component for interactive random tables.

**[Demo](https://grislyeye.github.io/vellum-random-table/)**

| Attribute  | Description                                                                         | Default |
| ---------- | ----------------------------------------------------------------------------------- | ------- |
| `select`   | The container/input to display roll results, identified by a CSS selector.          |         |
| `preroll`  | Loads table with pre-rolled result.                                                 | `false` |
| `hideroll` | Hides rolls and just displays the results.                                          | `false` |
| `hidecalc` | Shows rolls but hides calculations (i.e. `1 + 4`). Ignored when `hideroll == true`. | `false` |

### Examples

Simple, one-column table (elements are selected at random with equal weight):

```html
<vellum-random-table select="#result" preroll hideroll>
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

You have a few options (choose one of these):

1. Use the script directly via a 3rd party CDN.
2. Install via [npm](https://www.npmjs.com/package/@daviddarnes/mastodon-post): `npm install vellum-random0table`.
3. [Download the source manually from GitHub](https://github.com/grislyeye/vellum-random-table/tags) into your project.

### Usage

Include the `<script>` in your markup:

```html
<script
  type="module"
  src="https://www.unpkg.com/vellum-random-table@1.1.0/vellum-random-table.js"
></script>
```

If you host the script as part of your project:

```html
<script type="module" src="vellum-random-table.js"></script>
```
