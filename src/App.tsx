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


function DetailedCountry(props: {countries:Country[], darkMode:boolean}) {

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
    <div className="w-full px-8 mb-8 max-w-[80rem] mx-auto">
      <Link className="flex items-center justify-center w-[208px] h-[64px] rounded-md shadow-lg text-white bg-dark-blue text-xl mb-12" to={'/'} >Back</Link>
      {country && (
        <div key={country.name} className="max-w-[800px] mx-auto flex flex-col gap-8">
          <img src={country.flag} alt="" className="object-cover max-h-[28.75rem] w-full"/>
          <div className="flex flex-col gap-2">
            <p className="font-extrabold text-[2.75rem] py-8">{country.name}</p>
            <p className="font-semibold text-[1.75rem]">Native Name: <span className="font-thin">{country.nativeName}</span></p>
            <p className="font-semibold text-[1.75rem]">Population: <span className="font-thin">{country.population.toLocaleString()}</span></p>
            <p className="font-semibold text-[1.75rem]">Region: <span className="font-thin">{country.region}</span></p>
            <p className="font-semibold text-[1.75rem]">Sub Region: <span className="font-thin">{country.subregion}</span></p>
            {country.capital &&
              <p className="font-semibold text-[1.75rem]">Capital: <span className="font-thin">{country.capital}</span></p>
            }
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[1.75rem]">Top Level Domain: <span className="font-thin">{country.topLevelDomain}</span></p>
            <div className="flex gap-2">
              <p className="font-semibold text-[1.75rem]">Currencies: </p>
              {country.currencies.map(currency => (
                <p className="font-semibold text-[1.75rem]" key={currency.name}><span className="font-thin">{currency.name}</span></p>
              ))}
            </div>
            <div className="flex gap-2">
              <p className="font-semibold text-[1.75rem]">Languages: </p>
              {country.languages.map(language => (
                <p className="font-semibold text-[1.75rem]" key={language.name}><span className="font-thin">{language.name}</span></p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-[2rem]">Border Countries: </p>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {borderCountries.length > 1 && borderCountries.map(borderCountry => (
                <Link className="bg-dark-blue rounded-sm flex items-center justify-center text-white h-[56px] text-[1.5rem]" to={`../countries/${borderCountry}`} state={props.countries} key={borderCountry}>{borderCountry}</Link>
                ))}
            </div>
          </div>

        </div>
      )
      }
    </div>
  )
}

function Search(props: {filterByCountry:Function, filterBySearch:Function, darkMode:boolean}) {
  return (
    <div className={`w-full h-[60px] max-w-[30rem] rounded-lg  flex px-6 drop-shadow-md ${props.darkMode ? "text-white bg-dark-blue" : "text-dark-blue bg-white"}`}>
      <SearchIcon color={props.darkMode ? "dark" : "light"}></SearchIcon> 
      <input className={` w-full px-6 outline-none ${props.darkMode ? "text-white bg-dark-blue" : "text-dark-blue bg-white"}`} type="text" placeholder="Search for a country..." onChange={(e) => props.filterBySearch(e.target.value)}/>
    </div>
  );
}

function FilterButton(props: {region:string, filterCountries:Function}) {
  return <button onClick={() => props.filterCountries(props.region)}>{props.region}</button>
}

function FilterDropdown(props: {filterCountriesByRegion:Function, darkMode:boolean}) {
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
      <button onClick={toggleDrop} className={`h-[60px] z-20 px-6 flex items-center justify-between bg-dark-blue rounded-md text-white self-start w-full text-left drop-shadow-md ${props.darkMode ? "text-white bg-dark-blue" : "text-dark-blue bg-white"}`}>
        <p>Filter by Region</p>
        <DropdownIcon color={"dark"} />
      </button>
        <div className={`transition-all ease-in-out duration-500 ${dropdownVisible ? "opacity-100 top-16 drop-shadow-md" : "opacity-0 -translate-y-20 scale-y-0 -top-0"} opacity-0 absolute z-10 w-full flex flex-col gap-1 items-start  rounded-md p-6 ${props.darkMode ? "text-white bg-dark-blue" : "text-dark-blue bg-white"}`}>

          {regions.map(region => (
            <FilterButton key={region} region={region} filterCountries={props.filterCountriesByRegion} />
          ))}
        </div>
    </div>
  );
}

function FilterArea(props: {filterCountriesByRegion:Function, filterBySearch:Function, darkMode:boolean}) {
  return (
    <div className="px-8 flex flex-col md:flex-row justify-between items-start gap-8 xl:p-0">
      <Search darkMode={props.darkMode} filterBySearch={props.filterBySearch} filterByCountry={() => props.filterCountriesByRegion}/>
      <FilterDropdown darkMode={props.darkMode} filterCountriesByRegion={props.filterCountriesByRegion}/>
    </div>
  );
}

function ThemeSwitcher(props: {toggleMode:Function, darkMode:boolean}) {
  return (
    <button onClick={() => props.toggleMode()} className="font-semibold flex gap-2 items-center">
      <MoonIcon color={`${props.darkMode ? "dark" : "light"}`} />
      <p>Dark Mode</p>
    </button>
  )
}

function NavBar(props: {toggleMode:Function, darkMode:boolean}) {
  return (
    <div className={`${props.darkMode ? " text-white bg-dark-blue" : "text-dark-blue bg-white"} h-[100px] shadow-md z-50 flex items-center justify-between px-[20px] relative`}>
      <p className="font-extrabold">Where in the world?</p>
      <ThemeSwitcher toggleMode={props.toggleMode} darkMode={props.darkMode}/>
    </div>
  );
}

function CountryCard(props: {country:Country, darkMode:boolean}) {
  return (
    <Link to={`countries/${props.country.name}`} className={`flex flex-col rounded-md max-w-[20.5rem] w-full drop-shadow-xl overflow-hidden mx-auto ${props.darkMode ? "text-white bg-dark-blue" : "text-dark-blue bg-white"}`}>
      <img src={props.country.flag} className="rounded-t-md h-[200px] object-cover bg-clip-padding" alt={`flag of ${props.country.name}`} />
      <div className="p-6">
        <p className="font-extrabold text-xl py-4">{props.country.name}</p>
        <p className="font-semibold">Population: <span className="font-thin">{props.country.population.toLocaleString()}</span></p>
        <p className="font-semibold">Region: <span className="font-thin">{props.country.region}</span></p>
        <p className="font-semibold">Capital: <span className="font-thin">{props.country.capital}</span></p>
      </div>
    </Link>
  )
}

function DisplayCountries(props: {countries:Country[], darkMode:boolean}) {

  const [filtered, setFiltered] = useState(false);
  const [displayedCountries, setdisplayedCountries] = useState(Array<Country>);

  function filterBySearch(search: string) {
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
    <div className={`mx-auto max-w-[80rem] pt-8 mb-8 ${props.darkMode ? "text-white bg-very-dark-blue" : "text-dark-blue bg-white"}`}>
      <FilterArea darkMode={props.darkMode} filterBySearch={filterBySearch} filterCountriesByRegion={filterCountriesByRegion} />
      <div className="grid grid-cols-1 items-center justify-center content-center place-content-center w-full gap-12
      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {filtered ? 
          <>
          {displayedCountries.map(country => (
             <CountryCard key={country.name} country={country} darkMode={props.darkMode} />
          ))}
          </>
        :
          <>
            {props.countries.map(country => (
              <CountryCard key={country.name} country={country} darkMode={props.darkMode} />
              ))}
          </>
      }
      </div>
    </div>
  );
}

function Countries(props: {countries:Country[], darkMode:boolean}) {
  return (
    <div className={props.darkMode ? "bg-dark-blue" : "bg-white"}>
      <DisplayCountries countries={props.countries} darkMode={props.darkMode}/>
    </div>
  )
}


function App() {
  const [allCountries, setallCountries] = useState(Array<Country>);
  const [darkMode, setDarkMode] = useState(true);

  async function fetchCountries() {
    const response = await fetch('/data.json')
    const data = await response.json();

    setallCountries(data);
  }

  function toggleMode() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {console.log(darkMode)}, [darkMode]);

  useEffect(() => {
    if (allCountries.length < 1)
      fetchCountries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar toggleMode={toggleMode} darkMode={darkMode}/>
      <Routes>
        <Route path="/" element={<Countries darkMode={darkMode} countries={allCountries} />}>
        </Route>
        <Route path="/countries/:name" element={<DetailedCountry darkMode={darkMode} countries={allCountries} />}></Route>
      </Routes>
    </>
  );
}

export default App;

// ETA 6 HOURS
// START @ 9PM 31/07
