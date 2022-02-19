import { replaceCharsToHaveOnlyDotOrStringInIt } from "../../helpers/stringHelper";

const testCases = [
  {
    providedValue: ",37!",
    expectedResult: "37",
  },
  {
    providedValue: ".,37!",
    expectedResult: ".37",
  },
  {
    providedValue: "0,7",
    expectedResult: "07",
  },
  {
    providedValue: "-7",
    expectedResult: "7",
  },
  {
    providedValue: "-7.",
    expectedResult: "7.",
  },
  {
    providedValue: "+7",
    expectedResult: "7",
  },
  {
    providedValue: ".07.",
    expectedResult: ".07",
  },
  {
    providedValue: ".07.",
    expectedResult: ".07",
  },
];

describe("The replaceCharsToHaveOnlyDotOrStringInIt method", () => {
  testCases.forEach((testCase) => {
    it(`should keep only <${testCase.expectedResult}> when provided <${testCase.providedValue}>`, () => {
      expect(
        replaceCharsToHaveOnlyDotOrStringInIt(testCase.providedValue)
      ).toBe(testCase.expectedResult);
    });
  });
});
