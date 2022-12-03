describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3001/')
    cy.wait(5000);

    // The page should contain a heading with "WELCOME TO SCSE CLUB"
    cy.get('[role="heading"]').contains('WELCOME TO SCSE CLUB').should('be.visible')
    cy.wait(5000);

    // Find a button with a href attribute containing "contact" and click it
    cy.get('button a[href*="contact"]').first().click()
    cy.wait(5000);

    // The new url should include "/contact"
    cy.url().should('include', '/contact')

    // The new page should contain a heading with "Contact Us"
    cy.get('[role="heading"]').contains('Contact Us').should('be.visible')

    // Find the first link with an href attribute containing "/" and click it
    cy.get('a[href*="/"]').first().click()

    // The new url should include "/"
    cy.url().should('include', '/')

    // The new page should contain a heading with "WELCOME TO SCSE CLUB"
    cy.get('[role="heading"]').contains('WELCOME TO SCSE CLUB').should('be.visible')

    //Find the first link with an href attribute containing "academics" and click it
    cy.get('svg').click()
    cy.get('.css-muwysj > .chakra-stack > [href="/academics"] > .chakra-text').click()
    cy.wait(5000);
    cy.url().should('include', 'academics')
    cy.wait(5000)

    //Find the first link with an href attribute containing "events" and click it
    cy.get('svg').click()
    cy.get('.css-muwysj > .chakra-stack > [href="/events"] > .chakra-text').click()
    cy.wait(5000);
    cy.url().should('include', 'events')
    cy.wait(5000)


  })
})

// Prevent TypeScript from reading file as legacy script
export {}
