describe('App E2E Tests', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.contains('Iniciar sesión');
  });
});
