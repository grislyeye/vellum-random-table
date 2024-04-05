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

  connectedCallback(): void {
    super.connectedCallback()

    this.button.addEventListener('click', () => this.roll())
  }

  private get button(): HTMLButtonElement {
    return this.querySelector('button') as HTMLButtonElement
  }

  private get table(): HTMLTableElement {
    return this.querySelector('table') as HTMLTableElement
  }

  private get selection(): string[] {
    return Array.from(this.table.tBodies)
      .flatMap(tbody => Array.from(tbody.rows))
      .map(row => row.cells[0])
      .map(cell => cell.textContent)
      .map(content => content ? content : "")
      .map(content => content.trim())
  }

  private get resultBox(): HTMLElement {
    return this.shadowRoot?.querySelector('#results') as HTMLElement
  }

  roll(): void {
    const selection = this.selection
    const result = selection[Math.floor(Math.random() * selection.length)]
    this.resultBox.textContent = result
  }

  render() {
    return html`
      <div id="container">
        <div id="table">
          <slot></slot>
        </div>
        <p>Result:</p>
        <div id="results" role="alert" aria-label="Roll Result">
          &nbsp;
        </div>
      </div>
    `;
  }
}
