import axios from "axios"
import { useState, useEffect } from "react"
import Fish from "../components/Fish"
import styled from "styled-components"

function Fishes() {
    
        
    const [defaultFishes, setDefaultFishes] = useState(null)
    
    const getFishes = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fishes`)   
            setDefaultFishes(response.data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(() => {getFishes()}, [])

  return (
    <div>
        {defaultFishes && defaultFishes.map(fish => {
            return(
                <div key={fish._id}>
                  <Fish fish={fish}/>
                </div>
            )
        })}
    </div>
  )
}

export default Fishes