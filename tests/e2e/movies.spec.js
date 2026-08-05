const { test } = require('../support')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('should register a new movie successfully', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('should not register movie when required fields are empty', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'

    ])
})