import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Die, Roll } from './dice'

@customElement('vellum-dice')
export class VellumDice extends LitElement {
  static styles = css`
    :host {
      display: inline;
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
    }
  `

  get die(): string | null {
    return this.textContent
  }

  private reroll() {
    this.requestUpdate()
  }

  roll(): Roll | undefined {
    if (this.die) {
      const roll = Die.from(this.die.trim()).roll()
      return roll
    }
    return
  }

  render() {
    const roll = this.roll()
    return html`
      <span @click="${this.reroll}">
        ${roll ? roll.result : ''} (<slot></slot>&#9860;)
      </span>
    `
  }
}
