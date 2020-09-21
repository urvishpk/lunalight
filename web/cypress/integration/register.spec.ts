import { findByTestId, findElement } from "../utils";

describe("/register", () => {
  it("renders the register page", () => {
    cy.visit("/register");
    findByTestId("adminLogo").should("have.length", 1);
    findByTestId("registerForm")
      .should("have.length", 1)
      .within(() => {
        findByTestId("usernameInput").should("contain", "Username");
        findByTestId("emailInput").should("contain", "Email");
        findByTestId("passwordInput").should("contain", "Password");
        findByTestId("confirmPasswordInput").should(
          "contain",
          "Confirm Password"
        );
        findByTestId("submitButton")
          .should("have.length", 1)
          .should("contain", "Submit");
      });
  });

  it("presents errors for empty input", () => {
    cy.visit("/register");
    findByTestId("submitButton").click();
    findByTestId("usernameInput").should("contain", "Username is required.");
    findByTestId("emailInput").should("contain", "Email ID is required.");
    findByTestId("passwordInput").should("contain", "Password is required.");
    findByTestId("confirmPasswordInput").should(
      "contain",
      "Confirm password is required."
    );
    cy.url().should("contain", "/register");
  });

  it("presents errors for invalid input", () => {
    cy.visit("/register");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("ur");
    });
    findByTestId("emailInput").within(() => {
      findElement("input").type("urvishpk");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("1");
    });
    findByTestId("confirmPasswordInput").within(() => {
      findElement("input").type("12");
    });
    findByTestId("submitButton").click();
    findByTestId("usernameInput").should("contain", "Username is too short.");
    findByTestId("emailInput").should("contain", "Email ID is invalid.");
    findByTestId("passwordInput").should("contain", "Password is too short.");
    findByTestId("confirmPasswordInput").should(
      "contain",
      "Passwords do not match."
    );
    cy.url().should("contain", "/register");
  });

  it("presents errors for invalid input", () => {
    cy.visit("/register");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("urvishpk");
    });
    findByTestId("emailInput").within(() => {
      findElement("input").type("urvish@gmail.com");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("12345678");
    });
    findByTestId("confirmPasswordInput").within(() => {
      findElement("input").type("12345678");
    });
    findByTestId("submitButton").click();
    findByTestId("usernameInput").should(
      "contain",
      "Username is not available."
    );
    cy.url().should("contain", "/register");
  });

  it("presents errors for invalid input", () => {
    cy.visit("/register");
    findByTestId("usernameInput").within(() => {
      findElement("input").type("urvish");
    });
    findByTestId("emailInput").within(() => {
      findElement("input").type("urvish@gmail.com");
    });
    findByTestId("passwordInput").within(() => {
      findElement("input").type("12345678");
    });
    findByTestId("confirmPasswordInput").within(() => {
      findElement("input").type("12345678");
    });
    findByTestId("submitButton").click();
    cy.url().should("not.contain", "/register");
  });
});
