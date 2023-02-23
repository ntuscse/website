describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3001/");

    // The page should contain a heading with "WELCOME TO SCSE CLUB"
    cy.get('[role="heading"]').contains("WELCOME TO SCSE CLUB");

    // Find a button with a href attribute containing "contact" and click it
    cy.get('button a[href*="contact"]').first().click();

    // The new url should include "/contact"
    cy.url().should("include", "/contact");

    // The new page should contain a heading with "Contact Us"
    cy.get('[role="heading"]').contains("Contact Us");

    // Find the first link with an href attribute containing "/" and click it
    cy.get('a[href*="/"]').first().click();

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain a heading with "WELCOME TO SCSE CLUB"
    cy.get('[role="heading"]').contains("WELCOME TO SCSE CLUB");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
