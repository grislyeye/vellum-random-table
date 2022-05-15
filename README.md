# `<vellum-random-table>`

Custom element for displaying and rolling random tables.

## Installation

```bash
npm i vellum-random-table
```

## Usage

```html
<script type="module">
  import 'vellum-random-table/vellum-random-table.js';
</script>

<vellum-random-table></vellum-random-table>
```

The `<vellum-random-table>` element uses the following syntax:

```html
<vellum-random-table title="pack">
  <vellum-item>purse</vellum-item>
  <vellum-item weight="2">backpack</vellum-item>
  <vellum-item>bag</vellum-item>
  <vellum-item>pack</vellum-item>
  <vellum-item>rucksack</vellum-item>
</vellum-random-table>
```

This generates the following HTML:

<table>
  <thead>
    <tr>
        <td>d6</td>
        <td>pack</td>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>1</td>
        <td>purse</td>
    </tr>
    <tr>
        <td>2-3</td>
        <td>backpack</td>
    </tr>
    <tr>
        <td>4</td>
        <td>bag</td>
    </tr>
    <tr>
        <td>5</td>
        <td>pack</td>
    </tr>
    <tr>
        <td>6</td>
        <td>rucksack</td>
    </tr>
  </tbody>
</table>
<button type="button" disabled>Roll</button>

The `<vellum-random-table>` element should contain a number of `<vellum-item>` elements, each representing a row of the table.

The `<vellum-random-table>` element has the following attributes:

| Attribute | Description                                                  | Default                   |
| --------- | ------------------------------------------------------------ | ------------------------- |
| `die`     | The type of dice to be rolled for the table. This should use the standard TTRPG notation (e.g. d6, d20, etc.). | Automatically calculated. |
| `title`   | The category of items the table rolls for.                   | Empty string.             |

The `<vellum-item>` element should contain the text of the result, if this item is selected. It has the following attributes:

| Attribute | Description                                                  | Default                   |
| --------- | ------------------------------------------------------------ | ------------------------- |
| `weight`  | Determines how likely this item is to be selected. Weights greater than 1 increase the likelihood. A `2` makes it twice as likely, a `3` three times, etc.. | `1` |

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
