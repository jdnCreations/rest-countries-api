import { useEffect, useState } from "react";
import { Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import moon from './assets/images/moon-icon.svg';
import search from './assets/images/search-icon.svg';
import DropdownIcon from "./components/DropdownIcon";
import SearchIcon from "./components/SearchIcon";
import MoonIcon from "./components/MoonIcon";

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


function DetailedCountry(props: {countries:Country[], mode:string}) {

  // trigger useeffect when url changes
  const location = useLocation();

  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const { name } = useParams();
  const country = props.countries.find((country) => country.name === name);
  
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
  }, [location]);


  return (
    <div className="w-[500px] rounded-md bg-dark-blue">
      <Link to={'/'} >Back</Link>
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
            {borderCountries.length > 1 && borderCountries.map(borderCountry => (
              <Link to={`../countries/${borderCountry}`} state={props.countries} key={borderCountry}>{borderCountry}</Link>
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
    <div className="w-full h-[60px] rounded-lg bg-white flex px-6 drop-shadow-md">
      <SearchIcon color="light"></SearchIcon> 
      <input className="w-full px-6 outline-none" type="text" placeholder="Search for a country..."/>
    </div>
  );
}

function FilterDropdown() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function toggleDrop() {
    const toggle = dropdownVisible ? false : true;
    setDropdownVisible(toggle);
  }

  return (
    <div className="flex flex-col gap-1 w-[250px] text-left relative mb-8">
      <button onClick={toggleDrop} className="h-[60px] z-20 px-6 flex items-center justify-between bg-dark-blue rounded-md text-white self-start w-full text-left drop-shadow-md">
        <p>Filter by Region</p>
        <DropdownIcon color={"dark"} />
      </button>
        <div className={`transition-all ease-in-out duration-500 ${dropdownVisible ? "opacity-100" : "opacity-0 -translate-y-20 scale-y-0 -top-0"} opacity-0 absolute z-10 w-full top-16 flex flex-col gap-1 items-start bg-dark-blue rounded-md p-6 text-white`}>
          <button className="w-full text-left">Africa</button>
          <button className="w-full text-left">America</button>
          <button className="w-full text-left">Asia</button>
          <button className="w-full text-left">Europe</button>
          <button className="w-full text-left">Oceania</button>
        </div>
    </div>
  );
}

function FilterArea() {
  return (
    <div className="px-[20px] flex flex-col md:flex-row justify-between items-start gap-8">
      <Search />
      <FilterDropdown />
    </div>
  );
}

function ThemeSwitcher(props: {toggleMode:Function}) {
  return (
    <button onClick={() => props.toggleMode()} className="font-semibold flex gap-2 items-center">
      <MoonIcon color="light" />
      <p>Dark Mode</p>
    </button>
  )
}

function NavBar(props: {toggleMode:Function}) {
  return (
    <div className="h-[100px] shadow-md flex items-center justify-between px-[20px] mb-6">
      <p className="font-extrabold text-very-dark-blue-text">Where in the world?</p>
      <ThemeSwitcher toggleMode={props.toggleMode}/>
    </div>
  );
}

function CountryCard(props: {country:Country}) {
  return (
    <Link to={`countries/${props.country.name}`} className="flex flex-col rounded-md max-w-[500px] min-w-[100%] text-white bg-dark-blue drop-shadow-xl overflow-hidden">
      <img src={props.country.flag} className="h-[200px] object-cover over" alt={`flag of ${props.country.name}`} />
      <div className="p-6">
        <p className="font-extrabold text-xl py-4">{props.country.name}</p>
        <p className="font-semibold">Population: <span className="font-thin">{props.country.population}</span></p>
        <p className="font-semibold">Region: <span className="font-thin">{props.country.region}</span></p>
        <p className="font-semibold">Capital: <span className="font-thin">{props.country.capital}</span></p>
      </div>
    </Link>
  )
}

function DisplayCountries(props: {countries:Country[]}) {
  return (
    <div>
      <FilterArea />
      <div className="grid items-center w-full px-12 gap-12">

      {props.countries.map(country => (
        <CountryCard key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
}

function Countries(props: {countries:Country[], mode:string}) {
  return (
    <>
      <DisplayCountries countries={props.countries}/>
    </>
  )
}


function App() {
  const [allCountries, setallCountries] = useState(Array<Country>);
  const [mode, setMode] = useState('dark');

  async function fetchCountries() {
    const response = await fetch('/data.json')
    const data = await response.json();

    setallCountries(data);
  }

  function toggleMode() {
    let toggled = mode === "dark" ? "light" : "dark";
    setMode(toggled);
  }

  // useEffect(() => {
  //   console.log('use effect called');
  // })

  // useEffect(() => {console.log(mode)}, [mode]);

  useEffect(() => {
    if (allCountries.length < 1)
      fetchCountries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar toggleMode={toggleMode}/>
      <Routes>
        <Route path="/" element={<Countries mode={mode} countries={allCountries} />}>
        </Route>
        <Route path="/countries/:name" element={<DetailedCountry mode={mode} countries={allCountries} />}></Route>
      </Routes>
    </>
  );
}

export default App;

// ETA 6 HOURS
// START @ 9PM 31/07
