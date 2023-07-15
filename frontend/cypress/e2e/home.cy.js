describe("first test", () => {
  it("CRUD operation", () => {
    cy.intercept("GET", `http://localhost:5000/api/notes/?pageNumber=1`).as(
      "fetchNote"
    );
    cy.visit("/").wait("@fetchNote");
    // cy.get('[data-testid="overlay-outer"]').click("topRight");
    // cy.get(".primary-btn").click();
    cy.get(".primary-btn").click();
    cy.get('[data-testid="title-field"]').type("From Cypress");
    cy.get('[data-testid="tagline-field"]').type("Cypress");
    cy.get('[data-testid="note-field"]').type("this is the note from cypress");
    cy.get('[data-testid="action-btn"]').click();
    cy.scrollTo("bottom");
    cy.wait(1000).get(".pagination").find("span").last().click();
    cy.wait(2000);
    cy.get('[data-testid="card-container"]')
      .last()
      .trigger("mouseover")
      .find('[data-testid="card-delete"]')
      .scrollIntoView()
      .wait(1000)
      .click();
  });
});
