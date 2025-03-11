describe('EngageSphere API - Customers', () => {
  it('Successfully retrieves customers with default filters', () => {
    cy.request(
      'http://localhost:3000/customers?page=1&limit=10&size=All&industry=All'
    ).as('api');

    cy.get('@api').should((response) => {
      expect(response).to.have.property('status', 200);
    });
  });
});
