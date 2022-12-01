import axios from "axios"
import { useState, useEffect } from "react"
import Fish from "../components/Fish"

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
    <div className="card-container page-body">
        <h1 className="subtitle">Espécies</h1>
        {defaultFishes && defaultFishes.map(fish => {
            return(
                <div key={fish._id} style={{border: "1px solid black", borderRadius: "5px", margin: "2vh", textAlign: "center"}}>
                  <Fish fish={fish}/>
                </div>
            )
        })}
    </div>
  )
}

export default Fishes