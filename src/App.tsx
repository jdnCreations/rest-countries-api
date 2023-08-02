import { useEffect, useState } from "react";
import { Router, Routes, Route, Link, useParams } from 'react-router-dom';

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


function DetailedCountry(props: {countries:Country[]}) {

  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const { name } = useParams();
  const country = props.countries.find(country => country.name === name);

  const borderAbbrevs = country?.borders;

  // find countries where alpha2code is in borderAbbrevs
  // let borderCountries:string[] = [];

  function getBorderCountries() {
    let countries:string[] = [];
    for (let i = 0; i < props.countries.length; i++) {
      if (!borderCountries.includes(props.countries[i].alpha3Code)) {
        if (borderAbbrevs?.includes(props.countries[i].alpha3Code)) {
          countries.push(props.countries[i].name);
        }
      }
    }
    setBorderCountries(countries);
  } 

  useEffect(() => {
    getBorderCountries();
  }, []);


  return (
    <div>
      {country && (
        <div key={country.name}>
          <img src={country.flag} alt="" />
          <p>{country.name}</p>
          <p>Native Name: {country.nativeName}</p>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Sub Region: {country.subregion}</p>
          {country.capital && 
            <p>Capital: {country.capital}</p>
          }
          <p>Top Level Domain: {country.topLevelDomain}</p>
          <p>Currencies: </p>
          {country.currencies.map(currency => (
            <p key={currency.name}>{currency.name}</p>
          ))}
          <div>
            <p>Languages: </p>
            {country.languages.map(language => (
              <p key={language.name}>{language.name}</p>
            ))}
          </div>

          <div>
            <p>Border Countries: </p>
            {borderCountries && borderCountries.map(borderCountry => (
              <Link to={`../countries/${borderCountry}`} key={borderCountry}>{borderCountry}</Link>
            ))}
          </div>

        </div>
      )
      }
    </div>
  )
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
      <Link to={`countries/${props.country.name}`}>LINK</Link>
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
      <Routes>
        <Route path="/" element={<Countries countries={allCountries} />}>
        </Route>
        <Route path="/countries/:name" element={<DetailedCountry countries={allCountries} />}></Route>
      </Routes>
    </>
  );
}

export default App;

// ETA 6 HOURS
// START @ 9PM 31/07
