import { AuthContext } from '../contexts/auth.context';
import {useContext, useState, useEffect} from "react"
import axios from 'axios';
import Fishery from '../components/Fishery';
import { Link } from 'react-router-dom';

function Profile() {
    const {user, logout} = useContext(AuthContext)
    const storedToken = localStorage.getItem("authToken")
    
    const [allUserFisheries, setAllUserFisheries] = useState(null)
    const [allUserFishes, setAllUserFishes] = useState(null)
    
    const getFisheries = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fisheries`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            setAllUserFisheries(response.data.filter(fishery => fishery.userId === user._id))
        } catch (error) {
            console.log(error)
        }
    }
    const getFishes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userfishes`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            setAllUserFishes(response.data.filter(fish => fish.userId === user._id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {getFisheries()}, [user])
    useEffect(() => {getFishes()}, [user])
    
  return (
    <div>
      {user && <div>
        
      <img src={user.image} alt="user face" />
      <p>oi {user.name}</p>
      <p>{user.email}</p>
      <p>Nº Cartão de Pescador Sustentável: {user.sustainableFisherNumber}</p>
      <button onClick={logout}>logout</button>
      <Link to={`/edit/user/`}>Editar Perfil</Link>
      <Link to={`/add/fish/`}>Adicionar Troféu</Link>
      </div>}
      {allUserFisheries && allUserFisheries.map(fishery => {
        return (
            <div key={fishery._id}>
                <Fishery fishery={fishery}/>
            </div>
        )
      })}
      {allUserFishes && allUserFishes.map(fish => {
        return (
          <div key={fish._id}>
            <p>{fish.commonName}</p>
            <Link to={`/edit/fish/${fish._id}`}>Editar troféu</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Profile