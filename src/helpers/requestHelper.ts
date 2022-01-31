export const parseJson = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return jsonString;
  }
};
