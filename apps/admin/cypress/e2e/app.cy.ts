// example cypress test
describe("Redirect", () => {
	it("should redirect to the signin page", () => {
		// Start from the index page
		cy.visit("http://localhost:3002/");

		// The new url should include "/contact"
		cy.url().should("include", "/auth/signin");
	});
});

// Prevent TypeScript from reading file as legacy script
export {};
