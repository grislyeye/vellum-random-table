import { test, expect, Page, Locator } from '@playwright/test'
import { promises as fs } from 'fs'
import * as cheerio from 'cheerio'
import { randomUUID } from 'crypto';

test('displays table', async ({ page }) => {
  const fixture = await mountOn(page, `
    <vellum-random-table>
      <table>
        <tr>
          <th>Encounter</th>
        </tr>
        <tr>
          <td>1 wolf</td>
        </tr>
        <tr>
          <td>2 goblins</td>
        </tr>
      </table>
    </vellum-random-table>
  `);

  await expect(fixture.getByText('Encounter')).toBeVisible();
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
