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

The `<vellum-random-table>` use the following syntax:

```html
<vellum-random-table title="pack">
  <vellum-item>purse</vellum-item>
  <vellum-item weight="2">backpack</vellum-item>
  <vellum-item>bag</vellum-item>
  <vellum-item>pack</vellum-item>
  <vellum-item>rucksack</vellum-item>
</vellum-random-table>
```

This generates the following:

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
