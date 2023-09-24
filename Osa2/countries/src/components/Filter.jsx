const Filter = ({newFilter, handleFilterChange}) => {
    return (
    <div>
    Find countries: <input
    value={newFilter}
    onChange={handleFilterChange} />
  </div>
    )
  }

export default Filter;