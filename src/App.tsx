import { useEffect, useState } from "react";
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

function Search(props: {filterByCountry:Function, filterBySearch:Function}) {
  return (
    <div className="w-full h-[60px] max-w-[30rem] rounded-lg bg-white flex px-6 drop-shadow-md">
      <SearchIcon color="light"></SearchIcon> 
      <input className="w-full px-6 outline-none" type="text" placeholder="Search for a country..." onChange={(e) => props.filterBySearch(e.target.value)}/>
    </div>
  );
}

function FilterButton(props: {region:string, filterCountries:Function}) {
  return <button onClick={() => props.filterCountries(props.region)}>{props.region}</button>
}

function FilterDropdown(props: {filterCountriesByRegion:Function}) {
  const regions = [
    "Africa", "Americas", "Asia", "Europe", "Oceania" 
  ]

  const [dropdownVisible, setDropdownVisible] = useState(false);

  function toggleDrop() {
    const toggle = dropdownVisible ? false : true;
    setDropdownVisible(toggle);
  }

  return (
    <div className="flex flex-col gap-1 w-[250px] max-w-[12.5rem] text-left relative mb-8">
      <button onClick={toggleDrop} className="h-[60px] z-20 px-6 flex items-center justify-between bg-dark-blue rounded-md text-white self-start w-full text-left drop-shadow-md">
        <p>Filter by Region</p>
        <DropdownIcon color={"dark"} />
      </button>
        <div className={`transition-all ease-in-out duration-500 ${dropdownVisible ? "opacity-100 top-16" : "opacity-0 -translate-y-20 scale-y-0 -top-0"} opacity-0 absolute z-10 w-full flex flex-col gap-1 items-start bg-dark-blue rounded-md p-6 text-white`}>

          {regions.map(region => (
            <FilterButton key={region} region={region} filterCountries={props.filterCountriesByRegion} />
          ))}
        </div>
    </div>
  );
}

function FilterArea(props: {filterCountriesByRegion:Function, filterBySearch:Function}) {
  return (
    <div className="px-8 flex flex-col md:flex-row justify-between items-start gap-8 xl:p-0">
      <Search filterBySearch={props.filterBySearch} filterByCountry={() => props.filterCountriesByRegion}/>
      <FilterDropdown filterCountriesByRegion={props.filterCountriesByRegion}/>
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
    <Link to={`countries/${props.country.name}`} className="flex flex-col rounded-md max-w-[20.5rem] w-full text-white bg-dark-blue drop-shadow-xl overflow-hidden mx-auto">
      <img src={props.country.flag} className="rounded-t-md h-[200px] object-cover bg-clip-padding" alt={`flag of ${props.country.name}`} />
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

  const [filtered, setFiltered] = useState(false);
  const [displayedCountries, setdisplayedCountries] = useState(Array<Country>);

  function filterBySearch(search: string) {
    console.log('called filterbyserach');
    const countryMatches = props.countries.filter(
      (country) => country.name.includes(search))

    setFiltered(true);
    setdisplayedCountries(countryMatches);
  }

  function filterCountriesByRegion(region: string) {
    const filteredCountries = props.countries.filter(
      (country) => country.region === region)

    setFiltered(true);
    setdisplayedCountries(filteredCountries);
  }


  return (
    <div className="mx-auto max-w-[80rem]">
      <FilterArea filterBySearch={filterBySearch} filterCountriesByRegion={filterCountriesByRegion} />
      <div className="grid grid-cols-1 items-center justify-center content-center place-content-center w-full gap-12
      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {filtered ? 
          <>
          {displayedCountries.map(country => (
             <CountryCard key={country.name} country={country} />
          ))}
          </>
        :
          <>
            {props.countries.map(country => (
              <CountryCard key={country.name} country={country} />
              ))}
          </>
      }
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
