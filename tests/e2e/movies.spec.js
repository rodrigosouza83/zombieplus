const { test } = require('@playwright/test')

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

test('should be register a new movie', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    await moviesPage.create('Nome do filme', 'Sinopse', 'Netflix', '1983')

})