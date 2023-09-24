import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/Personform'
import Persons from './components/Persons'
import PersonService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    if(!newName || !newNumber) {
      alert ("Fill the fields")
      return
    }

    const findPerson = persons.find((person)=>person.name.toLowerCase() === newName.toLowerCase())

    // Cannot add person twice
    if(findPerson && findPerson.number === newNumber) {
      const msg = `${newName} is already added to phonebook`
      alert(msg)
    }

    // Update number
    else if(findPerson && findPerson.number !== newNumber) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = {...findPerson, number: newNumber }

      PersonService
        .update(findPerson.id, changedPerson).then(response=>{
          setPersons(persons.map(person => person.id !== findPerson.id ? person : response))
          setSuccessMessage(`Updated ${changedPerson.name}'s number`);
          setTimeout(() => {
          setSuccessMessage(null);
          }, 5000);
          setNewName('')
          setNewNumber('')
      })
        .catch(error=>{
          setPersons(persons.filter(person=>person.id !== findPerson.id))
          setErrorMessage(`Information of ${findPerson.name} has already been removed from server`)
          setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      })
    }
  }

  // Add new person
    else {
      const personObject = {
      name: newName,
      number: newNumber
  }

  PersonService.create(personObject).then(response=>{
    setPersons(persons.concat(response))
    setSuccessMessage(`Added ${response.name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setNewName('')
    setNewNumber('')
  })
  }
}

useEffect(() => {
  PersonService.getAll().then(response=>{
    setPersons(response)
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

const handleDelete = (id) => {
  if(window.confirm(`Confirm you want to delete this person`)) {
  PersonService.remove(id).then(response=>{
      setPersons(persons.filter(person=>person.id !== id))
      setSuccessMessage(`Deleted ${persons.find((person) => person.id === id).name}`)
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    })
}
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}


export default App