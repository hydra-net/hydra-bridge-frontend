import "@testing-library/jest-dom";

/**
 * Because we use dynamic id as props for the svg to avoid id collision
 * We need to transform the Icon component to an svg directly
 * So id won't be append, this will prevent snapshot from failling
 */
jest.mock("./common/components/Atoms/Icons/Icon", () => "svg");

/**
 * For useTranslation() we get the text by the json key
 * For i18n.t() we get the text by the display value
 */
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));
