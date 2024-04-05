import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('vellum-random-table')
export class VellumRandomTable extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `

  @property()
  select: string | undefined

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
      .flatMap((tbody) => Array.from(tbody.rows))
      .map((row) => row.cells[0])
      .map((cell) => cell.textContent)
      .map((content) => (content ? content : ''))
      .map((content) => content.trim())
  }

  private get resultTarget(): HTMLElement | undefined {
    if (this.select) return this.querySelector(this.select) as HTMLElement
    return undefined
  }

  roll(): void {
    if (this.resultTarget) {
      const selection = this.selection
      const result = selection[Math.floor(Math.random() * selection.length)]

      if (this.resultTarget instanceof HTMLInputElement)
        this.resultTarget.value = result
      else this.resultTarget.textContent = result
    }
  }

  render() {
    return html`
      <div id="container">
        <div id="table">
          <slot></slot>
        </div>
      </div>
    `
  }
}
