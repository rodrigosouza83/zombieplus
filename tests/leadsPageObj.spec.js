// @ts-check
import { test, expect } from '@playwright/test';

const { LandingPage } = require('./pages/LandingPage')

test('Positive Test Scenario', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rodrigo Souza', 'rodsz@gmail.com')
  const message = ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
  await landingPage.toastHaveText(message)


});

test('Negative Test Scenario', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rodrigo Souza', 'rodsz.mail.com')

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
})

test('Negative Test - name field empty', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'rodsz@gmail.com')

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
})

test('Negative Test - email empty', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rodrigo Souza', '')

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
})

test('Negative Test - all fields empty', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})