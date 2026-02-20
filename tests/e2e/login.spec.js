const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')

const { Toast } = require('../pages/Components')

let loginPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)

})

test('should log in successfully', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()

})

test('using incorrect user and password', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombie.com', 'pwd1234')
    
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
})
