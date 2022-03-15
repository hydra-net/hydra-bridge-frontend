import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Accordion, {
  AccordionProps,
} from "../../common/components/Molecules/Accordion/Accordion";
import { AccordionHeader } from "../../common/components/Molecules/Accordion/AccordionHeaders";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";

describe("The Accordion", () => {
  const content = <>Bar</>;
  it("should render correctly when closed", async () => {
    const header = (
      <AccordionHeader>
        <Label>Foo</Label>
      </AccordionHeader>
    );
    const props: AccordionProps = { header, content };
    const { asFragment } = render(<Accordion {...props} />);
    const element = screen.getByRole("button");

    const icon = element.querySelector<SVGElement>(
      `[data-icon="cutArrowDown"]`
    );

    expect(asFragment()).toMatchSnapshot();
    expect(element.getAttribute("aria-expanded")).toBe("false");
    expect(icon!.hasAttribute("data-icon")).toBe(true);
    expect(icon!.getAttribute("data-icon")).toBe("cutArrowDown");
    expect(icon).toHaveStyle("transform: rotate(-90deg)");
  });

  it("should render correctly when open", async () => {
    const header = (
      <AccordionHeader isOpen={true}>
        <Label>Foo</Label>
      </AccordionHeader>
    );
    const props: AccordionProps = { header, content };

    const { asFragment } = render(<Accordion {...props} />);
    const element = screen.getByRole("button");
    fireEvent.click(element);
    const icon = element.querySelector<SVGElement>(
      `[data-icon="cutArrowDown"]`
    );

    expect(asFragment()).toMatchSnapshot();
    expect(element.getAttribute("aria-expanded")).toBe("true");
    expect(icon!.hasAttribute("data-icon")).toBe(true);
    expect(icon!.getAttribute("data-icon")).toBe("cutArrowDown");
    expect(icon).toHaveStyle("transform: rotate(0)");
  });

  // ADD TEST CASES FOR
  // on toggle is defined but not isOpenFrom parent -> should open and onToggle called
  // onToggle not defined and isOpenFromparent not defined -> should open
  // onToggle  defined and isOpenFromparent true -> should not open locally
});
