describe('EngageSphere - Customer Management UI', () => {
  beforeEach(() => {
    cy.visit('/'); // Assuming 'http://localhost:3000/' is set as the baseUrl in cypress.config.js

    cy.get('[data-testid="size-filter"]').as('sizeFilter');
    cy.get('[data-testid="accept-button"]').as('acceptButton');
  });

  it('Maintains selected filter after returning from customer details', () => {
    cy.get('@acceptButton').click();

    // Verify the size filter exists and is visible
    cy.get('@sizeFilter').should('be.visible');

    // Select "Small" from the size filter
    cy.get('@sizeFilter').select('Small');

    // Verify that "Small" is now selected
    cy.get('@sizeFilter').within(() => {
      cy.get('option:selected').should('have.value', 'Small');
    });

    // Navigate to the customer details page (clicking on the last cell of the first row)
    cy.get('tbody > :nth-child(1) > :nth-child(6)').click();

    // Go back to the customer list page
    cy.get('.Button_buttonContainer__ti4sL > button').click();

    // Verify that "Small" is still selected in the size filter
    cy.get('@sizeFilter').within(() => {
      cy.get('option:selected').should('have.value', 'Small');
    });
  });
});
