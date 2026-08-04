const { expect } = require('../support')

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        const button = this.page.getByRole('button', { name: 'Cadastrar' })
        await button.scrollIntoViewIfNeeded()
        await button.click()
    }

    async create(movie) {

        await this.goForm()

        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click()

        await this.submit()
    }

      async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}