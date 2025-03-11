describe("EngageSphere - Interface Inicial API", () => {
  
    beforeEach(() => {
      cy.visit("/");
      cy.get('[data-test="accept-button"]').click();
    });
  
    it("Recupera clientes com sucesso (por exemplo, verifica o código de status 200)", () => {
      cy.buscarClientes()
    });
    
  });
  