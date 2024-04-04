# `vellum-random-table`

Web component for interactive, roll-able random tables.

## Usage

The `<vellum-random-table>` element should contain a table. This component detects the elements of this table and uses them to roll random results.

The simplest example is a table with 1 column:

```html
<vellum-random-table>
  <caption>Random Encounters</caption>
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
</vellum-random-table>
```

## Contributing
