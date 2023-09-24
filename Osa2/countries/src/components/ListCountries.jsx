import CountryData from "./CountryData"
import Show from "./Show"

const ListCountries = ({newFilter, countries}) => {
    
    const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

    if(countriesToShow.length>10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if(countriesToShow.length>1 && countriesToShow.length<10) return (
        <ul>
        {countriesToShow.map(country => 
          <li key={country.name.official}>{country.name.common} <Show country={country}/></li>
        )}
      </ul>
        )

    if(countriesToShow.length===1) {
        const country = countriesToShow[0]
        return (
            <CountryData country={country} />
        )
            }
    
}

export default ListCountries