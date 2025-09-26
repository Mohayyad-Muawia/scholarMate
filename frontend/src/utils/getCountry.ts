import { countries } from "../data/countries.json";

const getCountry = (code: string | undefined) => {
  if (code == undefined) {
    return;
  }
  return countries.find((country) => country.code === code);
};

export default getCountry;
