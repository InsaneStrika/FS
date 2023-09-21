import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person=>person.name).includes(newName)) {
    const msg = `${newName} is already added to phonebook`
    alert(msg)
  }
  else {
    const personObject = {
    name: newName,
    number: newNumber
  }

  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
  }
}

useEffect(() => {
  axios.get('http://localhost:3001/persons').then(response=>{
    setPersons(response.data)
  })
}, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons}/>
    </div>
  )
}


export default App