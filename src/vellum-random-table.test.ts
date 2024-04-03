import { test, expect, Page } from '@playwright/test'
import { promises as fs } from "fs"

test('displays table', async ({ page }) => {
  await fixture(page)(`
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

  await expect(page.getByText('Encounter')).toBeVisible();
});

function fixture(page: Page): (_: string) => Promise<void> {
  return async (fragment: string) => {
    const code = await fs.readFile('./vellum-random-table.js')

    await page.setContent(`
      <script>
        ${code.toString()}
      </script>

      ${fragment}
  `);
  }
}
