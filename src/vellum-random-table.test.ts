import { test, expect } from '@playwright/test'

test('displays table', async ({ page }) => {
  await page.addScriptTag({ path: './vellum-random-table.js' })
  await page.setContent(`
    <vellum-random-table select="#results">
      <table>
      <caption>Table</caption>
        <thead>
          <tr>
            <th>Encounter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 wolf</td>
          </tr>
          <tr>
            <td>2 goblins</td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Roll</button>
      <input id="results" type="text"/>
    </vellum-random-table>
  `)

  await expect(page.getByRole('table', { name: 'Table' })).toBeVisible()
})

test('displays empty table', async ({ page }) => {
  await page.addScriptTag({ path: './vellum-random-table.js' })
  await page.setContent(`
    <vellum-random-table select="#results">
      <table>
        <caption>Table</caption>
      </table>
      <button type="submit">Roll</button>
      <input id="results" type="text"/>
    </vellum-random-table>
  `)

  await expect(page.getByRole('table', { name: 'Table' })).toBeVisible()
})

test('rolls on random table', async ({ page }) => {
  await page.addScriptTag({ path: './vellum-random-table.js' })

  page.on('pageerror', (exception) => {
    console.log(`Uncaught exception: "${exception}"`)
    console.log(exception.stack)
  })

  await page.setContent(`
    <vellum-random-table select="#results" hideroll>
      <table>
        <thead>
          <tr>
            <th>Encounter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
          </tr>
          <tr>
            <td>B</td>
          </tr>
        </tbody>
      </table>
      <button>Roll</button>
      <label for="results">Result:</label>
      <input id="results" type="text"/>
    </vellum-random-table>
  `)

  await page.getByRole('button', { name: 'Roll' }).click()

  await page.screenshot({ path: './screenshot.png' })

  const result = await page.getByLabel('Result').textContent()

  const html = await page.content()
  console.log(html)
  expect(['A', 'B']).toContain(result?.trim())
})
