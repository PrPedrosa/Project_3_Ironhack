import { AuthContext } from "../contexts/auth.context"
import { useContext, useState } from "react"
import axios from "axios"
import Fishery from "../components/Fishery"
import { Link } from "react-router-dom"
import loadingGif from "../images/loading-gif.gif"

function Profile() {
  const { user } = useContext(AuthContext)
  const storedToken = localStorage.getItem("authToken")

  const [allUserFisheries, setAllUserFisheries] = useState(null)
  const [allUserFishes, setAllUserFishes] = useState(null)
  const [seeFisheries, setSeeFisheries] = useState(false)
  const [seeFishes, setSeeFishes] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleSeeFisheries = () => {
    if (allUserFisheries) {
      setSeeFisheries(false)
      setAllUserFisheries(null)
    } else {
      setLoading(true)
      getFisheries()
      setSeeFisheries(true)
      setLoading(false)
    }
  }

  const toggleSeeFishes = () => {
    if (allUserFishes) {
      setSeeFishes(false)
      setAllUserFishes(null)
    } else {
      setLoading(true)
      getFishes()
      setSeeFishes(true)
      setLoading(false)
    }
  }

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
      console.log(response.data)
      setAllUserFishes(response.data.filter(fish => fish.userId._id === user._id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='page-body'
      style={seeFisheries || (allUserFishes && allUserFishes[1]) ? { height: "100%" } : { height: "100vh" }}
    >
      {user && (
        <div className='user-details'>
          <div className='details-container'>
            <div className='user-pic-container'>
              <img src={user.image} alt='user face' className='user-pic' />
            </div>
            <div className='details-links'>
              <Link to={`/edit/user/`} className='small-buttons edit-btn'>
                Editar Perfil
              </Link>
              <Link to={`/add/fish/`} className='small-buttons'>
                Adicionar Troféu
              </Link>
              <Link to={`/add/fishery/`} className='small-buttons'>
                Registar Pesca
              </Link>
            </div>
          </div>
          <div className='details-box'>
            <p>
              <b>{user.name}</b>
            </p>
            <p>
              <b>{user.email}</b>
            </p>
            <p>
              <b>Cartão de Pescador Sustentável:</b> <br></br>
              {user.sustainableFisherNumber}
            </p>
          </div>
        </div>
      )}

      <div className='profile-buttons-box'>
        <button onClick={toggleSeeFisheries} className={seeFisheries ? "buttons switch" : "buttons"}>
          {seeFisheries ? "Esconder Pescas" : "Ver Pescas"}
        </button>
        <button onClick={toggleSeeFishes} className={seeFishes ? "buttons switch" : "buttons"}>
          {seeFishes ? "Esconder Troféus" : "Ver Troféus"}
        </button>
        {loading && <img src={loadingGif} alt='loading' />}
      </div>

      <div className='card-container'>
        {allUserFisheries &&
          seeFisheries &&
          allUserFisheries.map(fishery => {
            return (
              <div key={fishery._id} className='card-box'>
                <Fishery fishery={fishery} />
              </div>
            )
          })}
      </div>

      <div className='card-container'>
        {allUserFishes &&
          seeFishes &&
          allUserFishes.map(fish => {
            return (
              <>
                <div key={fish._id} className='user-fish-box'>
                  <div className='user-fish-img-box'>
                    <img src={fish.image} alt={fish.commonName} style={{ height: "10vh" }} className='user-fish-img' />
                  </div>
                  <div className='user-fish-box-details'>
                    <div className='user-fish-box-info'>
                      <span>
                        <b>{fish.commonName} - </b> {fish.weight}kg, {fish.length}cm
                      </span>
                    </div>
                    <span>{fish.areaFound}</span>
                    <Link to={`/edit/fish/${fish._id}`} className='edit-fish-btn'>
                      Editar
                    </Link>
                  </div>
                </div>
                <hr style={{ border: "1px solid blue", width: "90%", margin: "8px 0px" }} />
              </>
            )
          })}
      </div>
    </div>
  )
}

export default Profile
