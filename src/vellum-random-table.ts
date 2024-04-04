import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vellum-random-table')
export class VellumRandomTable extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    #container {
      display: flex;
      flex-direction: column;
    }

    #results {
      border-top: 1px solid;
      border-bottom: 1px solid;
    }
  `;

  get table(): HTMLTableElement {
    return this.querySelector('table') as HTMLTableElement
  }

  get list(): string[] {
    return Array.from(this.table.tBodies)
      .flatMap(tbody => Array.from(tbody.rows))
      .map(row => row.cells[0])
      .map(cell => cell.textContent)
      .map(content => content ? content : "")
      .map(content => content.trim())
  }

  get resultBox(): HTMLTableElement {
    return this.shadowRoot?.querySelector('#results') as HTMLTableElement
  }

  roll(): void {
    const result = this.list[Math.floor(Math.random() * this.list.length)]
    this.resultBox.textContent = result
    console.log(result)
  }

  render() {
    return html`
      <div id="container">
        <div id="table">
          <slot></slot>
          <button @click=${this.roll}>Roll 🎲</button>
        </div>
        <p>Result:</p>
        <div id="results" role="alert" aria-label="Roll Result">
          &nbsp;
        </div>
      </div>
    `;
  }
}
