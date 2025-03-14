describe("EngageSphere - Interface Inicial API", () => {
  
    beforeEach(() => {
      cy.visit("/");
      cy.get('[data-test="accept-button"]').click();
    });
  
    it("CT01 - Recupera clientes com sucesso (Mantém os filtros ao voltar da visualização de detalhes do cliente *)", () => {
      //cy.buscarClientes()
      cy.get('[data-test="view-customer-0"]').click();
      cy.get('[data-test="button-back"]').click();
      cy.get('[data-testid="size-filter"]')
        .find('option')
        .should('contain', 'All');
        
      });
    
  });
  