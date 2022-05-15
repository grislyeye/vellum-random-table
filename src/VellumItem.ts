import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Item } from './Item.js';

export class VellumItem extends LitElement implements Item {
  static styles = css`
    :host {
      display: table-row;
    }

    .item.cell {
      display: table-cell;
      padding: 1px;
    }
  `;

  @property({ type: Number }) weight: number = 1;

  @property({ attribute: false }) result: string | null = null;

  get value(): null | string {
    return this.textContent;
  }

  connectedCallback() {
    super.connectedCallback();

    const event = new CustomEvent<Item>('vellum-item-attached', {
      detail: this,
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="item cell">${this.result}</div>
      <div class="item cell"><slot></slot></div>
    `;
  }
}
