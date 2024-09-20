const credentials = require('../../src/app/auth.credentials');

describe('Authentication Tests', () => {
  const validUser = {
    email: credentials.testingUser.email,
    password: credentials.validPass
  }

  beforeEach(() => {
    cy.visit('/');
  });

  it('should show an alert with the correct message when credentials are incorrect', () => {
    cy.window().then((window) => {
      cy.stub(window, 'alert').as('alert');
    });

    cy.get('input[data-cy="email"]').type(`wrong${validUser.email}`);
    cy.get('input[data-cy="password"]').type(`wrong${validUser.password}`);
    cy.get('button[data-cy="submit"]').click();

    cy.get('@alert').should('be.calledWith', 'Invalid credentials.');
  });

  it('should redirect to login if not authenticated', () => {
    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  });

  it('should allow access to home if authenticated', () => {
    cy.get('input[data-cy="email"]').type(validUser.email);
    cy.get('input[data-cy="password"]').type(validUser.password);
    cy.get('button[data-cy="submit"]').click();

    cy.visit('/');

    cy.location('pathname').should('eq', '/');
  });
});
