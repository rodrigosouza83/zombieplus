// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]') técnica de xpath

  await page.getByRole('button', { name: /Aperte o play/ }).click() //getByRole é mais comum no playwright.

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Rodrigo Souza')
  await page.getByPlaceholder('Seu email principal').fill('rodsouza@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()


  /* irá pegar o conteúdo HTML do toast e imprimir no 
     console da UI do Playwright 
     
  await page.getByText('seus dados conosco').click()
   const content = await page.content()
   console.log(content)
   */

  const message = ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')

  await expect(page.locator('.toast')).toHaveText(message)
  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })

});
