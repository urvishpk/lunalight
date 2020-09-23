import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Landing from "./Landing";

describe("Landing", () => {
  it("should render the landing page", async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const heading = getByTestId("heading");
    expect(heading).toHaveTextContent("We'll be up soon.");

    const copyright = getByTestId("copyright");
    expect(copyright).toHaveTextContent("© 2020 Lunalight");

    const vendorLink = getByTestId("vendorLogin");
    expect(vendorLink).toHaveTextContent("Vendor Login →");
    const link = vendorLink.querySelector("a");
    expect(link.getAttribute("href")).toEqual("/login");
  });
});
