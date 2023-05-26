describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3001/");

    // The page should contain a heading with "NTU SCSE Club"
    cy.get('[role="heading"]').contains("NTU SCSE Club");

    // Find a link with a href attribute containing "contact" and click it
    cy.get('a[class*="chakra-link"][href*="contact"]').last().click();

    // The new url should include "/contact"
    cy.url().should("include", "/contact");

    // The new page should contain a heading with "CONTACT US"
    cy.get('[role="heading"]').contains("CONTACT US");

    // Find the first link with an href attribute containing "/" and click it
    cy.get('a[href*="/"]').first().click();

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain a heading with "NTU SCSE Club"
    cy.get('[role="heading"]').contains("NTU SCSE Club");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
