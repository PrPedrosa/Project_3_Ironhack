import axios from "axios"
import { useState, useEffect } from "react"
import Fish from "../components/Fish"

function Fishes() {
    const [defaultFishes, setDefaultFishes] = useState(null)

    const getFishes = async() => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fishes`)
        setDefaultFishes(response.data)
    } 

    useEffect(() => {getFishes()}, [])

  return (
    <div>
        {defaultFishes && defaultFishes.map(fish => {
            return(
                <div>
                <Fish fish={fish}/>
                </div>
            )
        })}
    </div>
  )
}

export default Fishes