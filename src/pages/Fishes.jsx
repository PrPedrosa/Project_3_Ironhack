import axios from "axios"
import { useState, useEffect } from "react"
import Fish from "../components/Fish"
import loadingGif from "../images/loading-gif.gif"

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
    <div className="page-body">
        <h1 className="subtitle">Espécies</h1>
        <div className="card-container">
        {defaultFishes ? defaultFishes.map(fish => {
            return(
                <div key={fish._id} style={{border: "1px solid black", borderRadius: "5px", margin: "2vh", textAlign: "center"}} className="fish-card-box">
                  <Fish fish={fish}/>
                </div>
            )
        }): <img src={loadingGif} alt="loading"/>}

        </div>
    </div>
  )
}

export default Fishes