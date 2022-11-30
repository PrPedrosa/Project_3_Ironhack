import { AuthContext } from '../contexts/auth.context';
import {useContext, useState, useEffect} from "react"
import axios from 'axios';
import Fishery from '../components/Fishery';
import { Link } from 'react-router-dom';

function Profile() {
    const {user} = useContext(AuthContext)
    const storedToken = localStorage.getItem("authToken")
    
    const [allUserFisheries, setAllUserFisheries] = useState(null)
    const [allUserFishes, setAllUserFishes] = useState(null)
    const [seeFisheries, setSeeFisheries] = useState(false)
    const [seeFishes, setSeeFishes] = useState(false)

    const toggleSeeFisheries = () => setSeeFisheries(!seeFisheries)
    const toggleSeeFishes = () => setSeeFishes(!seeFishes)
    
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

    const deleteFish = async (fishId) => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/fishes/${fishId}/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {getFisheries()}, [user])
    useEffect(() => {getFishes()}, [user])
    
  return (
    <div className='page-body' style={!seeFisheries ? {height: "100vh"}: {height: "100%"}}>
      {user && <div className='user-details'>
      <div className='details-container'>
        <div className='user-pic-container'>
          <img src={user.image} alt="user face" className='user-pic'/>
        </div>
        <div className='details-links'>
          <Link to={`/edit/user/`} className="small-buttons edit-btn">Editar Perfil</Link>
          <Link to={`/add/fish/`} className="small-buttons">Adicionar Troféu</Link>
          <Link to={`/add/fishery/`} className="small-buttons">Registar Capturas</Link>
          {/* <button onClick={logout} className="small-buttons logout">Logout</button> */}
        </div>
      </div>
      <div className='details-box'>
        <p><b>{user.name}</b></p>
        <p><b>{user.email}</b></p>
        <p><b>Cartão de Pescador Sustentável:</b> <br></br>{user.sustainableFisherNumber}</p>
      </div>
      </div>}
      <div className='profile-buttons-box'>
      <button onClick={toggleSeeFisheries} className={seeFisheries? "buttons switch" : "buttons"}>{seeFisheries? "Esconder Capturas" : "Ver Capturas"}</button>
      <button onClick={toggleSeeFishes} className={seeFishes? "buttons switch" : "buttons"}>{seeFishes? "Esconder Troféus" : "Ver Troféus"}</button>
      </div>
      <div className='card-container'>
      {allUserFisheries && seeFisheries && allUserFisheries.map(fishery => {
        return (
            <div key={fishery._id} className="card-box">
                <Fishery fishery={fishery}/>
            </div>
        )
      })}
      </div>
      {allUserFishes && seeFishes && allUserFishes.map(fish => {
        return (
          <div key={fish._id}>
            <p>{fish.commonName}</p>
            <Link to={`/edit/fish/${fish._id}`}>Editar</Link>
            <button onClick={() => deleteFish(fish._id)}>Apagar</button>
          </div>
        )
      })}
    </div>
  )
}

export default Profile