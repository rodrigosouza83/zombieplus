const { test, expect } = require('@playwright/test')

test('should log in successfully', async ({page}) => {
   await page.goto('http://localhost:3000/admin/login')

   const loginForm = page.locator('.login-form')
   await expect(loginForm).toBeVisible()

})