import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) =>  {
      setCountries(response.data)})
      .catch((error) => console.warn(error));
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <ListCountries newFilter={newFilter} countries={countries} />
  </div>
  );
}
export default App;