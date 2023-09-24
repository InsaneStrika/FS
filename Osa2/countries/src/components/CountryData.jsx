const CountryData = ({country}) => {
return (
            <div>
            <div><img src={`${country.flags.png}`} alt={`flag of ${country.name.common}`} height="150" width="220" /></div>
            <div>
            <h1>{country.name.common}</h1>
            <h2>Capital: {country.capital}</h2>
            <h2>Area: {country.area}</h2>
            </div>
            <h2>Languages: </h2>
            <div>
            <ul>
            {Object.entries(country.languages).map(([code, name]) => (
              <li key={code}>{name}</li>
            ))}
          </ul>
            </div>
            </div>
        )
            }
          
export default CountryData