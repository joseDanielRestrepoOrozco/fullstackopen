import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import Content from "./components/Content";

function App() {
  const [countries, setCountries] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      countriesService.getAll().then((initialCountries) => {
        setCountries(
          initialCountries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
        );
      });
    }
  }, [filter]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const selectCountry = (country) => {
    setFilter(country);
  };

  return (
    <>
      <div>
        find countries <input type="text" onChange={handleFilter} />
      </div>
      <Content countries={countries} selectCountry={selectCountry} />
    </>
  );
}

export default App;
