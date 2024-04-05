import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Die } from './dice'
import { Range, parseRange } from './range'

enum TableMode {
  FirstColumn,
  TwoColumn,
}

@customElement('vellum-random-table')
export class VellumRandomTable extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `

  @property()
  select: string | undefined

  @property({ type: Boolean })
  preroll: boolean = false

  connectedCallback(): void {
    super.connectedCallback()

    this.button.addEventListener('click', () => this.roll())
    if (this.preroll) this.roll()
  }

  get mode(): TableMode {
    if (this.table.rows[0].cells.length == 2) {
      return TableMode.TwoColumn
    } else {
      return TableMode.FirstColumn
    }
  }

  private get button(): HTMLButtonElement {
    return this.querySelector('button') as HTMLButtonElement
  }

  private get table(): HTMLTableElement {
    return this.querySelector('table') as HTMLTableElement
  }

  private get die(): Die | undefined {
    const maybeDieNotation = this.table.rows[0].cells[0].textContent
    if (maybeDieNotation) return new Die(maybeDieNotation)
    return undefined
  }

  private ranges(column: number): Range[] {
    return this.selection(column)
      .map((content) => content.trim())
      .map((cell) => parseRange(cell))
      .filter((item): item is Range => !!item)
  }

  private selection(column: number): string[] {
    return Array.from(this.table.tBodies)
      .flatMap((tbody) => Array.from(tbody.rows))
      .map((row) => row.cells[column])
      .map((cell) => cell.textContent)
      .map((content) => (content ? content : ''))
      .map((content) => content.trim())
  }

  private get resultTarget(): HTMLElement | undefined {
    if (this.select) return this.querySelector(this.select) as HTMLElement
    return undefined
  }

  roll(): void {
    const target = this.resultTarget
    if (!target) return

    if (this.mode == TableMode.FirstColumn) {
      const selection = this.selection(0)
      const result = selection[Math.floor(Math.random() * selection.length)]
      this.display(result)
    } else if (this.mode == TableMode.TwoColumn) {
      const ranges = this.ranges(0)
      const selection = this.selection(1)

      const roll = this.die?.roll()

      if (roll) {
        const index = ranges.findIndex((range) => range.includes(roll))

        const result = selection[index]
        this.display(`${result} (${roll})`)
      }
    }
  }

  private display(result: string): void {
    if (this.resultTarget && this.resultTarget instanceof HTMLInputElement) {
      this.resultTarget.value = result
    } else if (this.resultTarget) {
      this.resultTarget.textContent = result
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
