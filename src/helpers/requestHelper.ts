export const parseJson = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("Error parsing JSON", error);
    return jsonString;
  }
};
