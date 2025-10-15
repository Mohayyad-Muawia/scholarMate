import { countries } from "../data/countries.json";

interface SelectCountryProps {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

function SelectCountry({ setCountry, value }: SelectCountryProps) {
  return (
    <select
      value={value}
      onChange={(e) => setCountry(e.target.value)}
      aria-label="Select your country"
      className="country-select"
    >
      <option value="">🌍&nbsp;&nbsp;&nbsp;اختر الدولة</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.emoji}&nbsp;&nbsp;&nbsp;{country.name_ar}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
