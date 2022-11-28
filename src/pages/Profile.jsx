import { AuthContext } from '../contexts/auth.context';
import {useContext, useState, useEffect} from "react"
import axios from 'axios';
import Fishery from '../components/Fishery';
import { Link } from 'react-router-dom';

function Profile() {
    const {user, logout} = useContext(AuthContext)
    
    const [allUserFisheries, setAllUserFisheries] = useState(null)
    
    const getFisheries = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fisheries`)
            setAllUserFisheries(response.data.filter(fishery => fishery.userId === user._id))
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
      <p>Nº Cartão: {user.sustainableFisherNumber}</p>
      <button onClick={logout}>logout</button>
      <Link to={`/edit/user/${user._id}`}>Editar Perfil</Link>
      </div>}
      {allUserFisheries && allUserFisheries.map(fishery => {
        return (
            <div>
                <Fishery fishery={fishery}/>
            </div>
        )
      })}
    </div>
  )
}

export default Profile