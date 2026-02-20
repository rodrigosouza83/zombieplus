// @ts-check
import { test, expect } from '@playwright/test'

const { faker } = require('@faker-js/faker')

const leadsName = faker.person.fullName()
const leadsEmail = faker.internet.email()

const { LandingPage } = require('../pages/LandingPage')

const { Toast } = require('../pages/Components')

let landingPage
let toast


test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('Positive Test Scenario', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadsName, leadsEmail)
  const message = ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
  await toast.haveText(message)


});

test('Negative Test Scenario', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rodrigo Souza', 'rodsz.mail.com')

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
})

test('Negative Test - name field empty', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'rodsz@gmail.com')

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
})

test('Negative Test - email empty', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rodrigo Souza', '')

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
})

test('Negative Test - all fields empty', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})