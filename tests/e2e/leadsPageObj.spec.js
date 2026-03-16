const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let leadsName
let leadsEmail

test.beforeEach(async () => {
  leadsName = faker.person.fullName()
  leadsEmail = faker.internet.email()
})

test('Positive Test Scenario', async ({ page }) => {
  const landingPage = new LandingPage(page)
  const toast = new Toast(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadsName, leadsEmail)

  const message =
    'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await toast.haveText(message)
})

test('Negative Test Scenario - using the same email', async ({ page }) => {
  const landingPage = new LandingPage(page)
  const toast = new Toast(page)

  const successMessage =
    'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  const duplicateMessage =
    'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadsName, leadsEmail)
  await toast.haveText(successMessage)

  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Outro Nome', leadsEmail)
  await toast.haveText(duplicateMessage)
})

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