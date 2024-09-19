describe('Authentication Tests', () => {
  let isAuthenticated = false;
  const key = 'hotel-miranda-token';

  beforeEach(() => {
    cy.visit('/');

    cy.window().then((window) => {
      if (isAuthenticated) {
        window.localStorage.setItem(key, JSON.stringify({ token: 'fakeToken' }));
      } else {
        window.localStorage.removeItem(key);
      }
    });
  });

  it('should show an alert with the correct message when credentials are incorrect', () => {
    cy.window().then((window) => {
      cy.stub(window, 'alert').as('alert');
    });

    cy.get('input[data-cy="email"]').type('wrong@Email');
    cy.get('input[data-cy="password"]').type('wrongPassword');
    cy.get('button[data-cy="submit"]').click();

    cy.get('@alert').should('be.calledWith', 'Invalid credentials.');
  });

  it('should redirect to login if not authenticated', () => {
    isAuthenticated = false;

    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  });

  it('should allow access to home if authenticated', () => {
    isAuthenticated = true;

    cy.location('pathname').should('eq', '/');
  });
});
