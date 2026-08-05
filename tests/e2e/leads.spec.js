const { test } = require('../support')

test.skip('should register a new lead successfully', async ({ page }) => {
    await page.landing.visit()

    //await page.click('//button[text()="Aperte o play... se tiver coragem"]') técnica de xpath

    await page.landing.openLeadModal()

    await page.landing.submitLeadForm('Rodrigo Souza', 'rodsouza@gmail.com')

    /* irá pegar o conteúdo HTML do toast e imprimir no
       console da UI do Playwright

    await page.getByText('seus dados conosco').click()
     const content = await page.content()
     console.log(content)
     */

    const message = ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')

    await page.toast.haveText(message)
})

test('should not register lead with invalid email format', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm('Rodrigo Souza', 'rod.com.br')

    await page.landing.alertHaveText('Email incorreto')
})

test('should not register lead when name field is empty', async ({ page }) => {
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm('', 'rod@gmail.com')

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
