import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Accordion, {
  AccordionProps,
} from "../../common/components/Molecules/Accordion/Accordion";

describe("The Accordion", () => {
  const header = <h1>Foo</h1>;
  const content = <>Bar</>;
  it("should render correctly when closed", async () => {
    const props: AccordionProps = { header, content };

    const { asFragment } = render(<Accordion {...props} />);
    const element = screen.getByRole("button");

    expect(element.getAttribute("aria-expanded")).toBe("false");
    // @ts-ignore nullable
    expect(element.firstChild.lastChild).toHaveStyle("transform: rotate(0)");
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly when open", async () => {
    const props: AccordionProps = { header, content };

    const { asFragment } = render(<Accordion {...props} />);
    const element = screen.getByRole("button");
    fireEvent.click(element);

    expect(element.getAttribute("aria-expanded")).toBe("true");
    // @ts-ignore nullable
    expect(element.firstChild.lastChild).toHaveStyle(
      "transform: rotate(90deg)"
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
