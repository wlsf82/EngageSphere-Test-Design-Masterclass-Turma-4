describe("EngageSphere - Interface Inicial API", () => {
  
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="accept-button"]').click();
  });

  it("Recupera clientes com sucesso (por exemplo, verifica o código de status 200)", () => {
    cy.buscarClientes()
  });

  it("Verifica que a paginação retorna clientes diferentes entre páginas", () => {
    // Buscar clientes da página 1
    cy.buscarClientes(1, 5).then((page1Data) => {
      expect(page1Data.pageInfo.currentPage).to.eq(1);
      expect(page1Data.customers).to.have.length(5);
  
      // Buscar clientes da página 2
      cy.buscarClientes(2, 5).then((page2Data) => {
        expect(page2Data.pageInfo.currentPage).to.eq(2);
        expect(page2Data.customers).to.have.length(5);
  
        // Garante que os clientes das duas páginas são diferentes
        const clientesPagina1 = page1Data.customers.map(c => c.id);
        const clientesPagina2 = page2Data.customers.map(c => c.id);
        expect(clientesPagina1).to.not.deep.equal(clientesPagina2);
  
        cy.log("Clientes da Página 1:", page1Data.customers);
        cy.log("Clientes da Página 2:", page2Data.customers);
      });
    });
  });
  
});
