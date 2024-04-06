export type Range = number[]

const EMPTY_STR_TO_UNDEFINED = (str: string) => (str === '' ? undefined : str)

export function parseRange(notation: string): Range | undefined {
  const rangeNotation: RegExp = /^(\d*)(\W?-(\W?\d*))?$/g

  const [, start, , end] = rangeNotation
    .exec(notation.trim())!
    .map(EMPTY_STR_TO_UNDEFINED)

  if (start && !end) {
    return [parseInt(start)]
  } else if (start && end) {
    const size = parseInt(end) - parseInt(start) + 1
    return [...Array(size).keys()].map((i) => i + parseInt(start))
  }

  return
}
