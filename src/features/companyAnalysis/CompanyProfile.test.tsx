import React from "react";
import { render, cleanup, screen } from "../../test-utils";
import { CompanyProfile } from "./CompanyProfile";

afterEach(cleanup);

describe("Company Profile", () => {
  it("renders a snapshot", () => {
    const { container } = render(<CompanyProfile />);
    expect(container).toMatchSnapshot();
  });

  it("displays the company name", () => {
    screen.debug();
  });
});
