import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  LOGIN_MUTATION,
  LOGIN_RESPONSES,
  ME_QUERY,
  ME_RESPONSES,
} from "../testUtils/mockData";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

describe("Login", () => {
  it("should render the login form", async () => {
    const mocks = [
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[0],
      },
    ];
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    const adminLogo = getByTestId("adminLogo");
    expect(adminLogo).not.toBeNull();

    const loginForm = getByTestId("loginForm");
    expect(loginForm).not.toBeNull();

    const usernameField = getByTestId("usernameInput");
    expect(usernameField).toHaveTextContent("Username");
    const usernameInput = usernameField.querySelector("input");
    expect(usernameInput.type).toBe("text");

    const passwordField = getByTestId("passwordInput");
    expect(passwordField).toHaveTextContent("Password");
    const passwordInput = passwordField.querySelector("input");
    expect(passwordInput.type).toBe("password");

    const submitButton = getByTestId("submitButton");
    expect(submitButton).toHaveTextContent("Submit");
    expect(submitButton).not.toBeDisabled();
  });

  it("should redirect to dashboard", async () => {
    const mocks = [
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[1],
      },
    ];
    const { getByText } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </MemoryRouter>
    );

    const submitButton = getByText("Submit");
    await waitForElementToBeRemoved(() => document.querySelector("form"));
    expect(submitButton).not.toBeInTheDocument();
  });

  it("should present error for invalid input", async () => {
    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            options: { username: "", password: "" },
          },
        },
        result: LOGIN_RESPONSES[0],
      },
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[0],
      },
    ];

    const { getByTestId, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    const submitButton = getByTestId("submitButton");
    expect(submitButton).toHaveTextContent("Submit");
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Submitting");

    await findByText("Username is required.");
    await findByText("Password is required.");
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent("Submit");
  });

  it("should login the admin for valid input", async () => {
    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            options: { username: "urvishpk", password: "12345678" },
          },
        },
        result: LOGIN_RESPONSES[1],
      },
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[0],
      },
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[1],
      },
    ];
    const { getByTestId } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </MemoryRouter>
    );
    const usernameInput = getByTestId("usernameInput").querySelector("input");
    fireEvent.change(usernameInput, {
      target: { value: "urvishpk" },
    });
    const passwordInput = getByTestId("passwordInput").querySelector("input");
    fireEvent.change(passwordInput, {
      target: { value: "12345678" },
    });
    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Submitting");
    await waitForElementToBeRemoved(() => document.querySelector("form"));
    expect(submitButton).not.toBeInTheDocument();
  });
});
