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

  render() {
    return html`
      <div id="container">
        <div id="table">
          <slot></slot>
        </div>
        <p>Result:</p>
        <div id="results">
        </div>
      </div>
    `;
  }
}
