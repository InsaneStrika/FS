const Persons = ({newFilter, persons}) => {
    const personsToShow = persons.filter(person=>person.name.toLocaleLowerCase().includes(newFilter))
    return (
    <ul>
    {personsToShow.map(person => 
      <li key={person.name}>{person.name} {person.number}</li>
    )}
  </ul>
    )
}

export default Persons;