const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
    <form onSubmit={addPerson}>
    <div>
      Name: <input
      value={newName}
      onChange={handleNameChange}
      /> <br></br>
      Number: <input
      value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )
}

export default PersonForm;