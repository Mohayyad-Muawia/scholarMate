import { countries } from "../data/countries.json";

const getCountry = (code: string | undefined) => {
  if (code == undefined) {
    return {
      name_ar: "غير محدد",
      name_en: "unknown",
      emoji: "❓",
      flag: "",
    };
  }
  return (
    countries.find((country) => country.code === code) || {
      name_ar: "غير محدد",
      name_en: "unknown",
      emoji: "❓",
      flag: "",
    }
  );
};

export default getCountry;
