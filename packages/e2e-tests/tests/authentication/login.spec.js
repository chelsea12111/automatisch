// @ts-check
const { describe, publicTest, expect } = require('@playwright/test');

describe('Login page tests', () => {
  let loginPage;

  publicTest.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  publicTest.afterEach(async ({ page }) => {
    await page.close();
  });

  publicTest('shows login form', async ({ loginPage }) => {
    await loginPage.waitForEmailTextField();
    await loginPage.waitForPasswordTextField();
    await loginPage.waitForLoginButton();
  });

  publicTest('lets user login', async ({ loginPage }, { user }) => {
    await loginPage.login(user.email, user.password);

    await expect(loginPage.page).toHaveURL('/flows');
  });

  publicTest('doesn\'t let un-existing user login', async ({ loginPage }, { user }) => {
    await loginPage.login('nonexisting@automatisch.io', 'sample');

    await expect(loginPage.page).toHaveURL('/login');
    await expect(loginPage.errorMessage).toContainText('Invalid email or password');
  });
});

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailTextField = page.getByPlaceholder('Email');
    this.passwordTextField = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.getByText('Invalid email or password');
  }

  async navigateTo() {
    await this.page.goto('/login');
  }

  async waitForEmailTextField() {
    await this.emailTextField.waitFor({ state: 'attached' });
  }

  async waitForPasswordTextField() {
    await this.passwordTextField.waitFor({ state: 'attached' });
  }

  async waitForLoginButton() {
    await this.loginButton.waitFor({ state: 'attached' });
  }

  async login(email, password) {
    await this.emailTextField.fill(email);
    await this.passwordTextField.fill(password);
    await this.loginButton.click();
  }
}
