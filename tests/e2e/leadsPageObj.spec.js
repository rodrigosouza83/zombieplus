const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')

let leadsName
let leadsEmail

test.beforeEach(async () => {
    leadsName = faker.person.fullName()
    leadsEmail = faker.internet.email()
})

test('should register a new lead successfully', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm(leadsName, leadsEmail)

    const message =
        'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

    await page.toast.haveText(message)
})

test('should not register lead with an already registered email', async ({ page, request }) => {
    const leadsName = faker.person.fullName()
    const leadsEmail = faker.internet.email()

    const newLead = await request.post('http://localhost:3333/leads', {
        data: {
            name: leadsName,
            email: leadsEmail
        }
    })

    expect(newLead.ok()).toBeTruthy()

    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm(leadsName, leadsEmail)

    await page.toast.haveText(
        'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
    )
})

test('should not register lead with invalid email format', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm('Rodrigo Souza', 'rodsz.mail.com')

    await page.landing.alertHaveText('Email incorreto')
})

test('should not register lead when name field is empty', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm('', 'rodsz@gmail.com')

    await page.landing.alertHaveText('Campo obrigatório')
})

test('should not register lead when email field is empty', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm('Rodrigo Souza', '')

    await page.landing.alertHaveText('Campo obrigatório')
})

test('should not register lead when all fields are empty', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm('', '')

    await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
