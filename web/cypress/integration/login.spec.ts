import { findElement, findByTestId } from "../utils";

describe("/login", () => {
  it("renders the login page", () => {
    cy.visit("/login");
    findByTestId("adminLogo").should("have.length", 1);
    findByTestId("loginForm")
      .should("have.length", 1)
      .within(() => {
        findByTestId("usernameInput").should("have.length", 1);
        findByTestId("passwordInput").should("have.length", 1);
        findByTestId("submitButton")
          .should("have.length", 1)
          .should("contain", "Submit");
      });
  });

  it("presents errors for empty input", () => {
    cy.visit("/login");
    findByTestId("submitButton").click();
    findByTestId("usernameInput").should("contain", "Username is required.");
    findByTestId("passwordInput").should("contain", "Password is required.");
    cy.url().should("contain", "/login");
  });

  it("logs the user in and redirects to /", () => {
    cy.visit("/login");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("urvishpk");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("12345678");
    });
    findByTestId("submitButton").click();
    cy.url().should("contain", "/dashboard");
    cy.visit("/login");
    cy.url().should("contain", "/dashboard");
  });

  it("presents errors for invalid login credentials(password)", () => {
    cy.visit("/login");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("urvishpk");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("1234567");
    });
    findByTestId("submitButton").click();
    cy.url().should("contain", "/login");
    findByTestId("passwordInput").should("contain", "Password is incorrect.");
  });

  it("presents errors for invalid login credentials(username)", () => {
    cy.visit("/login");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("urvish");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("1234567");
    });
    findByTestId("submitButton").click();
    cy.url().should("contain", "/login");
    findByTestId("usernameInput").should("contain", "Username doesn't exist.");
  });
});
