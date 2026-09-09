/**
 * Skenario Pengujian:
 *
 * - Login spec
 *  - harus menampilkan halaman login secara lengkap
 *  - harus menampilkan alert ketika email dan password salah
 *  - harus berhasil login dan berpindah ke halaman utama ketika kredensial benar
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan halaman login secara lengkap', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Masuk Sekarang').should('be.visible');
  });

  it('harus menampilkan alert ketika email dan password salah', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginFail');

    cy.get('input[type="email"]').type('salah@gmail.com');
    cy.get('input[type="password"]').type('passwordsalah');

    cy.on('window:alert', (message) => {
      expect(message).to.equal('email or password is wrong');
    });

    cy.get('button[type="submit"]').click();
    cy.wait('@loginFail');
  });

  it('harus berhasil login dan berpindah ke halaman utama ketika kredensial benar', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User logged in',
        data: {
          token: 'token-e2e-valid-jwt',
        },
      },
    }).as('loginSuccess');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User profile retrieved',
        data: {
          user: {
            id: 'user-e2e-1',
            name: 'Budi Santoso',
            email: 'budi@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso',
          },
        },
      },
    }).as('getMe');

    cy.get('input[type="email"]').type('budi@example.com');
    cy.get('input[type="password"]').type('secretpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess');
    cy.wait('@getMe');

    // Verify redirected to homepage and user avatar appears
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('.nav-user').should('be.visible');
    cy.contains('Budi Santoso').should('be.visible');
  });
});
