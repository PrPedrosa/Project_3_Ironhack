import axios from "axios"
import { useState, useEffect } from "react"

function Fishes() {
    const [defaultFishes, setDefaultFishes] = useState(null)

    const getFishes = async() => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fishes`)
        setDefaultFishes(response.data)
    } 

    useEffect(() => {getFishes()}, [])

  return (
    <div>
        hello
    </div>
  )
}

export default Fishes