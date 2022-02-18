const reactI18Next: any = jest.createMockFromModule("react-i18next");

reactI18Next.useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

// eslint-disable-next-line no-undef
module.exports = reactI18Next;

export default {};
