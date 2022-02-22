import React from "react";
import { render, cleanup, screen } from "../../test-utils";
import { CompanyProfile } from "./CompanyProfile";
import { MyCompanyProfile } from "./useCompanyProfile";

const testCompanyProfile: MyCompanyProfile = {
  symbol: "XYZ",
  name: "Triple Letter",
  sector: "Entertainment",
  industry: "Media",
  exchange: "Private",
  description: "A made up company for testing",
  ceo: "Don Juan",
  website: "",
};

afterEach(cleanup);

describe("Company Profile", () => {
  it("renders a snapshot", () => {
    const { container } = render(<CompanyProfile {...testCompanyProfile} />);
    expect(container).toMatchSnapshot();
  });

  it("displays the company name", () => {
    render(<CompanyProfile {...testCompanyProfile} />);
    expect(screen.getByText("Triple Letter")).toBeInTheDocument();
  });
});
