import { findElement } from "../utils";

describe("/", () => {
  it("renders the landing page", () => {
    cy.visit("/");
    findElement("h1").should("contain", "Landing Page");
  });
});
