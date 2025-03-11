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

  it('Verify footer links', () => {
    // Click the accept button before verifying the footer
    cy.get('@acceptButton').click();

    // Verify the footer is present and visible on the page
    cy.get('[data-testid="footer"]').should('be.visible');

    // Verify the footer contains the correct copyright text
    cy.get('[data-testid="footer"] > p').should(
      'have.text',
      'Copyright 2025 - Talking About Testing'
    );

    // Define an array of expected footer links (text and href values)
    const links = [
      { text: 'Blog', href: 'https://talkingabouttesting.com' },
      { text: 'Courses', href: 'https://talking-about-testing.vercel.app/' },
      {
        text: 'Podcast',
        href: 'https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo',
      },
      { text: 'YouTube', href: 'https://youtube.com/@talkingabouttesting' },
    ];

    // Loop through each link in the array and verify its properties
    links.forEach(({ text, href }) => {
      // Find the link inside the footer by its text
      cy.contains('[data-testid="footer"] a', text)
        // Verify the link has the correct 'href' attribute
        .should('have.attr', 'href', href)
        // Ensure the link opens in a new tab by checking 'target="_blank"'
        .and('have.attr', 'target', '_blank');
    });
  });

  it('Empty Hi there', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Verify that the element is empty
    cy.get('[data-testid="name"]').should('be.empty');

    // Verify that the element contains "Hi there"
    cy.get('[data-testid="greeting-header"]').should('contain', 'Hi there');
  });

  it('Hi Joe there', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Write Joe on the name field
    cy.get('[data-testid="name"]').type('Joe');

    // Verify that the element contains "Hi there"
    cy.get('[data-testid="greeting-header"]').should('contain', 'Hi Joe');
  });

  it('Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto', () => {
    // Verify the page title is "EngageSphere"
    cy.title().should('eq', 'EngageSphere');

    // Verify the theme toggle button is visible
    cy.get('[data-testid="theme-toggle"]').should('be.visible');

    // Verify the input field is visible
    cy.get('[data-testid="name"]').should('be.visible');
  });

  it('Abre e fecha o messenger', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Open the messenger
    cy.get('[data-testid="open-messenger-icon"]').click();

    // Verify that the messenger is open (element is visible)
    cy.get('#messenger-name').should('be.visible');

    // Close the messenger
    cy.get('[data-testid="close-messenger-icon"]').click();

    // Verify that the messenger is closed (element does not exist)
    cy.get('#messenger-name').should('not.exist');
  });

  it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Open the messenger
    cy.get('[data-testid="open-messenger-icon"]').click();

    // Verify that the messenger is open (element is visible)
    cy.get('#messenger-name').should('be.visible');

    // Verify that the first input field is focused
    cy.get('#messenger-name').should('be.focused');

    // Try to submit the form without filling any fields
    cy.get('[data-testid="send-button"]').click();

    // Verify that the required fields show validation messages
    cy.get('#messenger-name').then(($input) => {
      expect($input[0].validationMessage).to.exist; // Field should show a validation message
      expect($input[0].validationMessage).to.include('Preencha este campo'); // Expected text
    });

    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.exist;
      expect($input[0].validationMessage).to.include('Preencha este campo'); // Required field message
    });

    cy.get('#message').then(($textarea) => {
      expect($textarea[0].validationMessage).to.exist; // Field should show a validation message
      expect($textarea[0].validationMessage).to.include('Preencha este campo'); // Expected text
    });
  });

  it('Mostra e oculta uma mensagem de sucesso ao enviar o formulário do messenger', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Open the messenger
    cy.get('[data-testid="open-messenger-icon"]').click();

    // Verify that the messenger is open
    cy.get('#messenger-name').should('be.visible');

    // Fill out the form with valid data
    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#message').type('Hello, I need support!');

    // Click the send button
    cy.get('[data-testid="send-button"]').click();

    // Verify that the success message appears
    cy.get('[data-testid="message-sent"]')
      .should('be.visible')
      .and('contain', 'Your message has been sent.');

    // Wait 3000 for the message to disappear (assuming it auto-hides)
    cy.wait(3000); // Adjust this time if needed based on your app's behavior
    cy.get('[data-testid="message-sent"]').should('not.exist');
  });

  it('Limpa todos os campos do formulário ao fechar e reabrir o messenger', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Open the messenger
    cy.get('[data-testid="open-messenger-icon"]').click();

    // Verify that the messenger is open
    cy.get('#messenger-name').should('be.visible');

    // Fill out the form with valid data
    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#message').type('Hello, I need support!');

    // Close the messenger
    cy.get('[data-testid="close-messenger-icon"]').click();

    // Reopen the messenger
    cy.get('[data-testid="open-messenger-icon"]').click();

    // Verify that all fields are empty
    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  });

  it('Mostra as colunas Nome da Empresa e Ação, e oculta as outras em viewport móvel', () => {
    // Click the accept button before running assertions
    cy.get('@acceptButton').click();

    // Set viewport to a mobile size
    cy.viewport(375, 667); // Example: iPhone 6/7/8 dimensions

    // Verify the table is visible
    cy.get('[data-testid="table"]').should('be.visible');

    // Verify "Company name" and "Action" columns are visible
    cy.contains('th', 'Company name').should('be.visible');
    cy.contains('th', 'Action').should('be.visible');

    // Verify "ID", "Industry", "Number of employees", and "Size" columns are hidden
    cy.contains('th', 'ID').should('not.be.visible');
    cy.contains('th', 'Industry').should('not.be.visible');
    cy.contains('th', 'Number of employees').should('not.be.visible');
    cy.contains('th', 'Size').should('not.be.visible');
  });
});
