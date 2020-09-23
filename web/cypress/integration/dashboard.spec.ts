import { findByTestId, findElement } from "../utils";

describe("/dashboard", () => {
  it("redirects to login page for unauthorized user", () => {
    cy.visit("/dashboard");
    cy.url().should("contain", "/login");
  });

  it("logs admin in, visits dashboard, logs admin out", () => {
    cy.visit("/dashboard");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("urvishpk");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("12345678");
    });
    findByTestId("submitButton").click();
    findByTestId("logoutButton").click();
    cy.url().should("contain", "/login");
  });
});
