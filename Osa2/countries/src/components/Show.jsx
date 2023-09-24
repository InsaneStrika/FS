import {useState} from 'react'
import CountryData from "./CountryData"

const Show = ({country}) => {
    const [show, set] = useState(false)

    const handleShow = () => set(!show)

    if(show === false){
        return(
            <button onClick = {handleShow}> Show </button>
        )
    }

    else{
        return(
            <div>
                <CountryData country = {country} />
                <button onClick = {handleShow}> Hide </button>
            </div>
        )
    }
}

export default Show