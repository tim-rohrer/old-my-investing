import React from "react";
import { render, cleanup } from "../../test-utils";
import Portfolio from "./Portfolio";
import Button from "../../common/Button";

afterEach(cleanup);

describe("Portfolio", () => {
  it("renders a snapshot", () => {
    const { container } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });
  // it("fires event", () => {
  //   const { container, asFragment } = render(
  //     <Button onClick={() => callAlert()}>Alert!</Button>
  //   );
  //   fireEvent.click(container);
  //   // expec
  //   // const { container } = render(<Portfolio />)
  //   // const node = getByDisplayValue(container, 'Alert!')
  //   // const myEvent = createEvent.click(node, { button: 1 })
  //   // fireEvent(node, myEvent)
  // });
});
