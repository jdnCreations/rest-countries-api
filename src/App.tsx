import { useEffect, useState } from "react";

interface Country {
  name: string,
  topLevelDomain: Array<string>,
  alpha2Code: string,
  alpha3Code: string,
  callingCodes: Array<string>, 
  capital: string,
  altSellings: Array<string>,
  subregion: string,
  region: string,
  population: number,
  latlng: Array<number>,
  demonym: string,
  area: number,
  timezones: Array<string>,
  borders: Array<string>,
  nativeName: string,
  numericCode: string,
  flags: {
    svg: string,
    png: string
  },
  currencies: [
    {
      code: string,
      name: string,
      symbol: string
    }
  ],
  languages: [
    {
      iso639_1:string,
      iso639_2:string,
      name:string,
      nativeName:string,
    },
    {
      iso639_1:string,
      iso639_2:string,
      name:string,
      nativeName:string
    },
    {
      iso639_1:string,
      iso639_2:string,
      name:string,
      nativeName:string
    }
  ],
  translations: {
    br:string,
    pt:string,
    nl:string,
    hr:string,
    fa:string,
    de:string,
    es:string,
    fr:string,
    ja:string,
    it:string,
    hu:string
  },
  flag:string,
  regionalBlocs: [
    {
      acronym:string,
      name:string
    }
  ],
  cioc:string,
  independent: boolean,
}


function Search() {
  return (
    <div>
      <input type="text" placeholder="Search for a country..."/>
    </div>
  );
}

function FilterDropdown() {
  return (
    <div>
      <select name="filter" id="filter">
        <option value="Africa">Africa</option>
      </select>
    </div>
  );
}

function FilterArea() {
  return (
    <div>
      <Search />
      <FilterDropdown />
    </div>
  );
}

function ThemeSwitcher() {
  return (
    <div>
      Dark Mode
    </div>
  )
}

function NavBar() {
  return (
    <div>
      <p>Where in the world?</p>
      <ThemeSwitcher />
    </div>
  );
}

function CountryCard(props: {country:Country}) {
  return (
    <div>
      <img src={props.country.flag} alt={`flag of ${props.country.name}`} />
      <p>{props.country.name}</p>
      <p>Population: {props.country.population}</p>
      <p>Region: {props.country.region}</p>
      <p>Capital: {props.country.capital}</p>
    </div>
  )
}

function DisplayCountries(props: {countries:Country[]}) {
  return (
    <div>
      <FilterArea />
      {props.countries.map(country => (
        <CountryCard key={country.name} country={country} />
      ))}
    </div>
  );
}

function Countries(props: {countries:Country[]}) {
  return (
    <>
    <NavBar />
    <DisplayCountries countries={props.countries}/>
    </>
  )
}


function App() {
  const [allCountries, setallCountries] = useState(Array<Country>);


  function fetchCountries() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setallCountries(data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchCountries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Countries countries={allCountries} />
    </>
  );
}

export default App;

// ETA 6 HOURS
// START @ 9PM 31/07
