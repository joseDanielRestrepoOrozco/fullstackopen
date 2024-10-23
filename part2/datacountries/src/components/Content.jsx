const Country = ({ country }) => {
  const { name, capital, area, languages, flags } = country;
  return (
    <>
      <h1>{name.common}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
    </>
  );
};

const CountryListItem = ({ name, selectCountry }) => {
  return (
    <li>
      {name}
      <button onClick={() => selectCountry(name)}>show</button>
    </li>
  );
};

const Content = ({ countries, selectCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <CountryListItem
            key={country.name.common}
            name={country.name.common}
            selectCountry={selectCountry}
          />
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} />;
  }
};

export default Content;
