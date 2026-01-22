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

  await page.waitForTimeout(1000)
});
