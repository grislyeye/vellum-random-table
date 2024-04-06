export interface Roll {
  result: number
  rolls: string
}

export class Die {
  private static EMPTY_STR_TO_UNDEFINED = (str: string) =>
    str === '' ? undefined : str

  private notation: string
  readonly number: number
  readonly dice: number
  readonly modifier: number

  constructor(notation: string) {
    this.notation = notation.trim()

    const diceNotation: RegExp = /^(\d*)d(\d+)(\s*(\+|-)\s*(\d+))?$/g

    const [, number = '1', dice = '1', , plusMinus = '+', modifier = '0'] =
      diceNotation.exec(this.notation)!.map(Die.EMPTY_STR_TO_UNDEFINED)

    this.number = parseInt(number)
    this.dice = parseInt(dice)
    this.modifier = parseInt(plusMinus + modifier)
  }

  roll(): Roll {
    const rolls = Array.from({ length: this.number }, () =>
      Math.floor(Math.random() * this.dice + 1),
    )

    const result = rolls.reduce((a, b) => a + b, 0) + this.modifier
    const rollsWithModifier =
      this.modifier !== 0 ? [...rolls, this.modifier] : rolls

    const roll: Roll = {
      result,
      rolls: rollsWithModifier.join(' + '),
    }

    return roll
  }

  toString(): string {
    return this.notation
  }
}
