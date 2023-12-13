import { useDispatch } from "react-redux"
import { changeFilter } from '../reducers/filterReducer'


const Filter = () => {

    const dispatch = useDispatch()


    const handleChange = (event) => {
      const filtered = event.target.value
      dispatch(changeFilter(filtered))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        Filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter