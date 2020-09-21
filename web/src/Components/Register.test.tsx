import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { REGISTER_MUTATION, REGISTER_RESPONSES } from "../testUtils/mockData";
import { Register } from "./Register";

describe("Register", () => {
  it("should render the register form", async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <Register />
      </MockedProvider>
    );
    const adminLogo = getByTestId("adminLogo");
    expect(adminLogo).not.toBeNull();

    const registerForm = getByTestId("registerForm");
    expect(registerForm).not.toBeNull();

    const usernameField = getByTestId("usernameInput");
    expect(usernameField).toHaveTextContent("Username");
    const usernameInput = usernameField.querySelector("input");
    expect(usernameInput.type).toBe("text");

    const emailField = getByTestId("emailInput");
    expect(emailField).toHaveTextContent("Email");
    const emailInput = emailField.querySelector("input");
    expect(emailInput.type).toBe("text");

    const passwordField = getByTestId("passwordInput");
    expect(passwordField).toHaveTextContent("Password");
    const passwordInput = passwordField.querySelector("input");
    expect(passwordInput.type).toBe("password");

    const confirmPasswordField = getByTestId("confirmPasswordInput");
    expect(confirmPasswordField).toHaveTextContent("Confirm Password");
    const confirmPasswordInput = confirmPasswordField.querySelector("input");
    expect(confirmPasswordInput.type).toBe("password");

    const submitButton = getByTestId("submitButton");
    expect(submitButton).toHaveTextContent("Submit");
    expect(submitButton).not.toBeDisabled();
  });

  it("should present errors for invalid input", async () => {
    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            options: {
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            },
          },
        },
        result: REGISTER_RESPONSES[0],
      },
    ];

    const { getByTestId, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Register />
      </MockedProvider>
    );

    const submitButton = getByTestId("submitButton");
    expect(submitButton).toHaveTextContent("Submit");
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Submitting");

    await findByText("Username is required.");
    await findByText("Email is required.");
    await findByText("Password is required.");
    await findByText("Confirm password is required.");
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent("Submit");
  });

  it("should register a new admin for valid input", async () => {
    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            options: {
              username: "urvishpk",
              email: "urvish@gmail.com",
              password: "12345678",
              confirmPassword: "12345678",
            },
          },
        },
        result: REGISTER_RESPONSES[1],
      },
    ];
    const history: any = {
      push: jest.fn(),
    };

    const { getByTestId, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Register history={history} />
      </MockedProvider>
    );

    const usernameInput = getByTestId("usernameInput").querySelector("input");
    fireEvent.change(usernameInput, {
      target: { value: "urvishpk" },
    });

    const emailInput = getByTestId("emailInput").querySelector("input");
    fireEvent.change(emailInput, {
      target: { value: "urvish@gmail.com" },
    });

    const passwordInput = getByTestId("passwordInput").querySelector("input");
    fireEvent.change(passwordInput, {
      target: { value: "12345678" },
    });

    const confirmPasswordInput = getByTestId(
      "confirmPasswordInput"
    ).querySelector("input");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "12345678" },
    });

    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Submitting");

    await findByText("Submit");
    expect(submitButton).not.toBeDisabled();
    expect(history.push).toHaveBeenCalledWith("/");
  });
});
