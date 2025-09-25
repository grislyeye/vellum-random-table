import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Die, Roll } from './dice'
import { Range, parseRange } from './range'

enum TableMode {
  OneColumn,
  TwoColumn,
  MultiColumn,
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

  @property({ type: Boolean })
  hideroll: boolean = false

  @property({ type: Boolean })
  hidecalc: boolean = false

  connectedCallback(): void {
    super.connectedCallback()

    this.button.addEventListener('click', () => this.roll())
    if (this.preroll) this.roll()
  }

  get mode(): TableMode {
    if (this.table.rows[0].cells.length > 2) {
      return TableMode.MultiColumn
    } else if (this.table.rows[0].cells.length == 2) {
      return TableMode.TwoColumn
    } else {
      return TableMode.OneColumn
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
    if (maybeDieNotation) return Die.from(maybeDieNotation)
    return
  }

  private ranges(column: number): Range[] {
    return this.selection(column)
      .map((cell) => cell.textContent)
      .filter((content): content is string => !!content)
      .map((cell) => parseRange(cell))
      .filter((item): item is Range => !!item)
  }

  private selection(column: number): HTMLElement[] {
    return Array.from(this.table.tBodies)
      .flatMap((tbody) => Array.from(tbody.rows))
      .map((row) => row.cells[column])
  }

  private resultColumns(): HTMLElement[][] {
    return [...Array(this.table.rows[0].cells.length - 1).keys()]
      .map((column) => column + 1)
      .map((column) => this.selection(column))
  }

  private get resultTarget(): HTMLElement | undefined {
    if (this.select) return this.querySelector(this.select) as HTMLElement
    return
  }

  roll(): void {
    const target = this.resultTarget
    if (!target) return

    if (this.mode === TableMode.OneColumn) {
      const selection = this.selection(0)
      const roll = Math.floor(Math.random() * selection.length)
      const result = selection[roll]

      if (!this.hideroll) this.display(result, `${roll + 1}`)
      else this.display(result)
    } else if (this.mode === TableMode.TwoColumn) {
      const ranges = this.ranges(0)
      const selection = this.selection(1)

      const roll = this.die?.roll()

      if (roll) {
        const index = ranges.findIndex((range) => range.includes(roll.result))

        const result = selection[index]

        if (!this.hideroll) {
          const calc = this.hidecalc ? '' : ` = ${roll.rolls}`
          this.display(result, `${roll.result}${calc}`)
        } else {
          this.display(result)
        }
      }
    } else if (this.mode === TableMode.MultiColumn) {
      const ranges = this.ranges(0)
      const result = this.resultColumns()
        .map((column: HTMLElement[]) => {
          const roll = this.die?.roll()
          if (roll) {
            const index = ranges.findIndex((range) =>
              range.includes(roll.result),
            )
            return [column[index], roll]
          }
        })
        .map(([element, roll]: [HTMLElement, Roll]) =>
          this.hideroll
            ? element?.innerText
            : `${element?.innerText} (${roll.result})`,
        )
        .join(' ')

      this.displayAsString(result)
    }
  }

  private display(
    result: HTMLElement,
    details: string | undefined = undefined,
  ): void {
    const target = this.resultTarget

    if (target && target instanceof HTMLInputElement) {
      target.value = `${result.textContent}${details ? ` (${details})` : ''}`
    } else if (target) {
      target.innerHTML = ''

      Array.from(result.children).forEach((c) =>
        target.appendChild(c.cloneNode(true)),
      )

      if (details) target.appendChild(document.createTextNode(` (${details})`))
    }
  }

  private displayAsString(
    result: string,
    details: string | undefined = undefined,
  ): void {
    const target = this.resultTarget

    if (target && target instanceof HTMLInputElement) {
      target.value = `${result}${details ? ` (${details})` : ''}`
    } else if (target) {
      target.innerHTML = ''
      target.appendChild(document.createTextNode('result'))

      if (details) target.appendChild(document.createTextNode(` (${details})`))
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
