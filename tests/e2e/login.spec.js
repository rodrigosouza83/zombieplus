const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')

const { MoviesPage } = require('../pages/MoviesPages')

const { Toast } = require('../pages/Components')

let loginPage
let moviesPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    moviesPage = new MoviesPage(page)
    toast = new Toast(page)

})

test('should log in successfully', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

})

test('trying to validate using an invalid email', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('www.rodrigo.com.br', 'pwd1234')

    await loginPage.alertHaveText('Email incorreto')
})

test('trying to validate using an empty email field', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'pwd1234')

    await loginPage.alertHaveText('Campo obrigatório')
})

test('trying to validate using empty password field', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('rods83@gmail.com', '')

    await loginPage.alertHaveText('Campo obrigatório')
})


test('trying to validate using empty  email and password field', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', '')

    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})




