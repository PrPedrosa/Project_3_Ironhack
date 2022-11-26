import { AuthContext } from '../contexts/auth.context';
import {useContext, useState, useEffect} from "react"
import axios from 'axios';

function Profile() {
    const {user} = useContext(AuthContext)
    
    const [allFisheries, setAllFisheries] = useState(null)
    
    const getFisheries = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fisheries`)
            setAllFisheries(response.data.filter(fishery => fishery.userId === user._id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {getFisheries()}, [user])
    
  return (
    <div>
      {user && <div>
        
      <img src={user.image} alt="user face" />
      <p>oi {user.name}</p>
      <p>{user.email}</p>
      </div>}
      {allFisheries && allFisheries.map(fishery => {
        return (
            <div>
                <p>{fishery.number}</p>
                <img src={fishery.image} alt="fishing" />
                <p>{fishery.date}</p>
            </div>
        )
      })}
    </div>
  )
}

export default Profile