import useAmountInput from "../../modules/Home/useAmountInput";
import { act, renderHook, RenderResult } from "@testing-library/react-hooks";

describe("useAmountInput hook", () => {
  let hookInstance: RenderResult<any> | { current: {} };

  beforeEach(() => {
    const { result } = renderHook(() =>
      //@ts-ignore
      useAmountInput("", 2, 2, 2, 2, [], false, () => true)
    );
    hookInstance = result;
  });

  afterEach(() => {
    hookInstance = { current: {} };
  });

  describe("default hook state", () => {
    it("should have empty string as value for state amountIn", () => {
      expect(hookInstance.current.amountIn).toBe("");
    });

    it("should have empty string as value for state amountOut", () => {
      expect(hookInstance.current.amountOut).toBe("");
    });

    it("should have false as value for sate isNotEnoughBalance", () => {
      expect(hookInstance.current.isNotEnoughBalance).toBe(false);
    });

    it("getParsedAmountIn should return number 0 when amountIn is empty", () => {
      const parsedAmount = hookInstance.current.getParsedAmountIn();

      expect(hookInstance.current.amountIn).toBe("");
      expect(typeof parsedAmount === "number").toBe(true);
      expect(parsedAmount).toBe(0);
    });

    it("getParsedAmountOut should return number 0 when amountIn is empty", () => {
      const parsedAmount = hookInstance.current.getParsedAmountOut();

      expect(hookInstance.current.amountIn).toBe("");
      expect(typeof parsedAmount === "number").toBe(true);
      expect(parsedAmount).toBe(0);
    });
  });

  describe("when updating amountIn on onAmountInChange", () => {
    it("should be a whole number", () => {
      act(() => {
        hookInstance.current.onAmountInChange("32");
      });
      expect(hookInstance.current.amountIn).toBe("32");
      expect(hookInstance.current.getParsedAmountIn()).toBe(32);
      expect(hookInstance.current.getParsedAmountOut()).toBe(32);
    });

    it("should be empty and parsedFunctions returns 0", () => {
      act(() => {
        hookInstance.current.setAmountIn("32");
        hookInstance.current.setAmountOut("32");
        hookInstance.current.onAmountInChange("");
      });
      expect(hookInstance.current.amountIn).toBe("");
      expect(hookInstance.current.getParsedAmountIn()).toBe(0);
      expect(hookInstance.current.getParsedAmountOut()).toBe(0);
    });

    it("should be a decimal number", () => {
      act(() => {
        hookInstance.current.onAmountInChange("32.4");
      });
      expect(hookInstance.current.amountIn).toBe("32.4");
      expect(hookInstance.current.getParsedAmountIn()).toBe(32.4);
      expect(hookInstance.current.getParsedAmountOut()).toBe(32.4);
    });

    it("should return number 0 when writing first with a dot", () => {
      act(() => {
        hookInstance.current.onAmountInChange(".");
      });
      expect(hookInstance.current.amountIn).toBe(".");
      expect(hookInstance.current.getParsedAmountIn()).toBe(0);
      expect(hookInstance.current.getParsedAmountOut()).toBe(0);
    });

    it("should be 0 and decimal number", () => {
      act(() => {
        hookInstance.current.onAmountInChange(".34");
      });
      expect(hookInstance.current.amountIn).toBe(".34");
      expect(hookInstance.current.getParsedAmountIn()).toBe(0.34);
      expect(hookInstance.current.getParsedAmountOut()).toBe(0.34);
    });

    it("should be 0 and decimal number", () => {
      act(() => {
        hookInstance.current.onAmountInChange("7.");
      });
      expect(hookInstance.current.amountIn).toBe("7.");
      console.log(hookInstance.current.getParsedAmountIn());
      expect(hookInstance.current.getParsedAmountIn()).toBe(7);
      expect(hookInstance.current.getParsedAmountOut()).toBe(7);
    });

    it("should be parsed correctly with big numbers", () => {
      act(() => {
        hookInstance.current.onAmountInChange("99999999999999999999999999");
      });
      expect(hookInstance.current.amountIn).toBe("99999999999999999999999999");
      expect(hookInstance.current.getParsedAmountIn()).toBe(
        99999999999999999999999999
      );
      expect(hookInstance.current.getParsedAmountOut()).toBe(
        99999999999999999999999999
      );
    });
  });
});
