const { test } = require('@playwright/test')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

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

    const movie = data.create

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await toast.haveText('Cadastro realizado com sucesso!')

})