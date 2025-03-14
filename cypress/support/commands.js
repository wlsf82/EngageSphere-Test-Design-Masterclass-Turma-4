// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("buscarClientes", (page = 1, limit = 10, size = "All", industry = "All") => {
//   cy.request({
//     method: "GET",
//     url: `${Cypress.env("apiUrl")}/customers?page=${page}&limit=${limit}&size=${size}&industry=${industry}`,
//   }).then((response) => {
//     expect(response.status).to.eq(200);
//     return response.body;
//   });
// });

Cypress.Commands.add('getClientesPorPagina', (pagina) => {
  return cy.request({
    method: 'GET',
    url: `http://localhost:3001/customers?page=${pagina}&limit=10&size=All&industry=All`,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('customers');
    expect(response.body.customers).to.be.an('array').that.is.not.empty;

    // Exibir no console para debug
    cy.log(`Clientes da Página ${pagina}:`, JSON.stringify(response.body.customers, null, 2));
    console.log(`Clientes da Página ${pagina}:`, response.body.customers);

    return cy.wrap(response.body.customers.map(c => c.id)); // ✅ Garantindo que o Cypress gerencie a async function corretamente
  });
});


