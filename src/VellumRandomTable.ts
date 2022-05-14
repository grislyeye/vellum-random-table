import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Item } from './Item.js';
import { ItemEvent } from './ItemEvent.js';

export class VellumRandomTable extends LitElement {
  static styles = css`
    .host {
      display: table;
    }

    .table .row {
      display: table-row;
    }

    .table .cell {
      display: table-cell;
    }
  `;

  @property({ type: String }) die: string | null = null;

  @property({ type: String }) title: string = '';

  private items: Item[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('vellum-item-attached', this.tableItemRegistered);
  }

  disconnectedCallback() {
    this.removeEventListener('vellum-item-attached', this.tableItemRegistered);
  }

  private tableItemRegistered(event: Event) {
    const { item } = (<CustomEvent<ItemEvent>>event).detail;
    this.items.push(item);
    this.updateItems();
  }

  private updateItems() {
    this.die = `d${this.items.map(i => i.weight).reduce((a, b) => a + b, 0)}`;

    const group: (a: Item, b: number) => [Item, number][] = item => [[item, 0]];

    this.items
      .map(group)
      .reduce((prev: [Item, number][], current: [Item, number][]) => {
        const head = prev.slice(-1)[0];
        const item = current[0][0];
        return [...prev, [item, head[1] + current[0][1] + item.weight]];
      })
      .forEach(row => {
        const [item, index] = row;
        item.result = VellumRandomTable.renderItem(item, index + 1);
      });
  }

  roll() {
    const table = this.items
      .map(i => [i])
      .reduce((prev: Item[], current: Item[]) => {
        const item = current[0];
        const copied: Item[] = Array.from({ length: item.weight }, () => item);
        return prev.concat(copied);
      });

    alert(table[Math.floor(Math.random() * table.length)].value);
  }

  render() {
    return html`
      <div class="table">
        <div class="head row">
          <div class="cell">${this.die}</div>
          <div class="cell">${this.title}</div>
        </div>
        <slot></slot>
      </div>
      <button @click="${this.roll}" type="button">Roll</button>
    `;
  }

  private static renderItem(item: Item, row: number): string {
    if (item.weight <= 1) return row.toString();
    return `${row - 1}-${row + item.weight - 2}`;
  }
}
