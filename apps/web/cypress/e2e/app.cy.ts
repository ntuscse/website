describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3001/')

    // The page should contain an h1 with "Welcome to Next.js!"
    cy.get('h1').contains('Welcome to Next.js!')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/about')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Page')

    // Find the first link with an href attribute containing "/" and click it
    cy.get('a[href*="/"]').first().click()

    // The new page should contain an h1 with "Welcome to Next.js!"
    cy.get('h1').contains('Welcome to Next.js!')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
