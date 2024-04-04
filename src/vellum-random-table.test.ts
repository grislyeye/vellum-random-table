import { test, expect, Page, Locator } from '@playwright/test'
import { promises as fs } from 'fs'
import * as cheerio from 'cheerio'
import { randomUUID } from 'crypto';

test('displays table', async ({ page }) => {
  const fixture = await mountOn(page, `
    <vellum-random-table>
      <table>
        <caption>Random Encounters</caption>
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
    </vellum-random-table>
  `);

  await expect(fixture.getByRole('table', { name: 'Random Encounters' })).toBeVisible();
});

test('displays empty table', async ({ page }) => {
  const fixture = await mountOn(page, `
    <vellum-random-table>
      <table>
        <caption>Random Encounters</caption>
      </table>
    </vellum-random-table>
  `);

  await expect(fixture.getByRole('table', { name: 'Random Encounters' })).toBeVisible();
});

test('rolls on random table', async ({ page }) => {
  const fixture = await mountOn(page, `
    <vellum-random-table>
      <table>
        <caption>Random Encounters</caption>
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
    </vellum-random-table>
  `);

  await fixture.getByRole('button', { name: 'Roll' }).click()
  const result = await fixture.getByRole('alert', { name: 'Roll Result' }).textContent()


  expect(['1 wolf', '2 goblins']).toContain(result)
});

async function mountOn(page: Page, fragment: string): Promise<Locator> {
  const code = await fs.readFile('./vellum-random-table.js')
  const html = cheerio.load(fragment)('vellum-random-table')
  const uuid = randomUUID()
  const component = html.attr('data-testid', uuid)

  await page.setContent(`
      <script>
        ${code.toString()}
      </script>

      ${component.toString()}
  `);

  return await page.getByTestId(uuid)
}
