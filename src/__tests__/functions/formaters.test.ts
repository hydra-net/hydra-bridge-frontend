import { formatTxHash, formatWalletAddress } from "../../helpers/walletHelper";

describe("The formatTxHash helper method", () => {
  const testCases = [
    {
      providedValue:
        "0x2e6b1426732aeb5f9ea4e7c0b8cdb66530b0030f4f4b44ed589eb04689b93d48",
      expectedResult: "0x2e6b1426732aeb5f9e...",
    },
    {
      providedValue: "",
      expectedResult: "",
    },
    {
      providedValue: undefined,
      expectedResult: "",
    },
    {
      providedValue: null,
      expectedResult: "",
    },
  ];

  testCases.forEach((testCase) => {
    it(`should display <${testCase.expectedResult}> when provided <${testCase.providedValue}>`, () => {
      // @ts-ignore null and undefined type
      expect(formatTxHash(testCase.providedValue)).toBe(
        testCase.expectedResult
      );
    });
  });
});

describe("The formatWalletAddress helper method", () => {
  const testCases = [
    {
      providedValue: "0x5E932E447cd3fA1545C225f8g1f36E6056c5e55k",
      expectedResult: "0x5E93...e55k",
    },
    {
      providedValue: "",
      expectedResult: "Invalid address",
    },
    {
      providedValue: undefined,
      expectedResult: "Invalid address",
    },
    {
      providedValue: null,
      expectedResult: "Invalid address",
    },
  ];
  testCases.forEach((testCase) => {
    it(`should display <${testCase.expectedResult}> when provided <${testCase.providedValue}>`, () => {
      // @ts-ignore null and undefined type
      expect(formatWalletAddress(false, testCase.providedValue)).toBe(
        testCase.expectedResult
      );
    });

    it("should display Wrong network when isWrongNetwork is true", () => {
      // @ts-ignore null and undefined type
      expect(formatWalletAddress(true, testCase.providedValue)).toBe(
        "Wrong network"
      );
    });
  });
});
