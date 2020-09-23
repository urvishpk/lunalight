import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Dashboard from "./Dashboard";
import {
  LOGOUT_MUTATION,
  LOGOUT_RESPONSES,
  ME_QUERY,
  ME_RESPONSES,
} from "../testUtils/mockData";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

describe("Landing", () => {
  it("should redirect to login page", async () => {
    const mocks = [
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[0],
      },
    ];
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByText("Loading"));
    const heading = screen.queryByText("Lunalight");
    const logoutButton = screen.queryByText("Logout");
    expect(heading).toBeNull();
    expect(logoutButton).toBeNull();
  });

  it("should render the dashboard", async () => {
    const mocks = [
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[1],
      },
    ];
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByText("Loading"));
    screen.getByText("Lunalight");
    screen.getByText("Logout");
  });

  it("should logout admin", async () => {
    const mocks = [
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[1],
      },
      {
        request: { query: LOGOUT_MUTATION },
        result: LOGOUT_RESPONSES[0],
      },
      {
        request: { query: ME_QUERY },
        result: ME_RESPONSES[0],
      },
    ];
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByText("Loading"));
    const logoutButton = screen.getByText("Logout");
    userEvent.click(logoutButton);
    await waitForElementToBeRemoved(() => screen.getByText("Lunalight"));
    expect(logoutButton).not.toBeInTheDocument();
  });
});
