const Persons = ({newFilter, persons, handleDelete}) => {
    const personsToShow = persons.filter((person)=>person.name.toLocaleLowerCase().includes(newFilter))
    return (
    <ul>
    {personsToShow.map(person => 
      <li key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>Delete</button></li>
    )}
  </ul>
    )
}

export default Persons;