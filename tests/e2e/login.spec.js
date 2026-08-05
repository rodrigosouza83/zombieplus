const { test } = require('../support')

test('should log in successfully', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
})

test('should not log in with an invalid email format', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('www.rodrigo.com.br', 'pwd1234')

    await page.login.alertHaveText('Email incorreto')
})

test('should not log in when email field is empty', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'pwd1234')

    await page.login.alertHaveText('Campo obrigatório')
})

test('should not log in when password field is empty', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('rods83@gmail.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})

test('should not log in when email and password fields are empty', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')

    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
