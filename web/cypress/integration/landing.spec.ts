import { findByTestId } from "../utils";

describe("/", () => {
  it("renders the landing page", () => {
    cy.visit("/");
    findByTestId("heading")
      .should("have.length", 1)
      .should("contain", "We'll be up soon.");
    findByTestId("copyright")
      .should("have.length", 1)
      .should("contain", "© 2020 Lunalight");
    findByTestId("vendorLogin")
      .should("have.length", 1)
      .should("contain", "Vendor Login →")
      .click();
    cy.url().should("contain", "/login");
  });
});
