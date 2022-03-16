import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Accordion, {
  AccordionProps,
} from "../../common/components/Molecules/Accordion/Accordion";
import { AccordionHeader } from "../../common/components/Molecules/Accordion/AccordionHeaders";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";

describe("The Accordion", () => {
  const getHeader = (isOpen = false) => (
    <AccordionHeader isOpen={isOpen}>
      <Label>Foo</Label>
    </AccordionHeader>
  );
  const content = <>Bar</>;

  it("should render correctly when closed", async () => {
    const props: AccordionProps = { header: getHeader(), content };
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
    const props: AccordionProps = { header: getHeader(true), content };

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

  describe("The Accordion independently", () => {
    const props: AccordionProps = { header: getHeader(), content };
    const onToggle = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should open and emit the new status when onToggle is defined but not isOpenFromParent", async () => {
      const { asFragment } = render(
        <Accordion {...props} onToggle={onToggle} />
      );

      const element = screen.getByRole("button");
      fireEvent.click(element);

      expect(asFragment()).toMatchSnapshot();
      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(true);
      expect(element.getAttribute("aria-expanded")).toBe("true");
    });

    it("should not open itself when is open is handled by parent", async () => {
      const { asFragment } = render(
        <Accordion {...props} onToggle={onToggle} isOpenFromParent={false} />
      );

      const element = screen.getByRole("button");
      fireEvent.click(element);

      expect(asFragment()).toMatchSnapshot();
      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(true);
      expect(element.getAttribute("aria-expanded")).toBe("false");
    });
  });
});
