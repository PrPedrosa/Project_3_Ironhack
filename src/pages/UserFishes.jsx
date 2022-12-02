import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../contexts/auth.context';
import { Link } from "react-router-dom";
import loadingGif from "../images/loading-gif.gif"

function UserFishes() {
    const [allUserFishes, setAllUserFishes] = useState(null)
    const {user} = useContext(AuthContext)
    const storedToken = localStorage.getItem("authToken")

    const getFishes = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/userfishes`, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })   
            setAllUserFishes(response.data)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(() => {getFishes()}, [])

  return (
  <div className="page-body" style={allUserFishes && allUserFishes[3] ? {height: "100%"} : {height: "100vh"}}>
    <h1 className="subtitle">Troféus</h1>
    <div className='card-container'>
      {allUserFishes ? allUserFishes.map(fish => {
        return (
          <>
          <div key={fish._id} className="user-fish-box">
            <div className='user-fish-img-box'>
            <img src={fish.image} alt={fish.commonName} className="user-fish-img"/>
            </div>
            <div className='user-fish-box-details'>
            <span><b>Pescador: </b>{fish.userId.name}</span>
            <div className='user-fish-box-info'>
            <span><b>{fish.commonName}: </b> {fish.weight}kg, {fish.length}cm</span>
            {/* <span>{fish.weight}kg,</span>
            <span>{fish.length}cm</span> */}
            </div>
            <span>{fish.areaFound}</span>
            {fish.userId._id === user._id && <Link to={`/edit/fish/${fish._id}`} className="edit-fish-btn">Editar</Link>}
            </div>
          </div>
          <hr  style={{border: "1px solid blue", width: "90%", margin: "8px 0px"}}/>
          </>
        )
      }) : <img src={loadingGif} alt="loading"/>}
    </div>
  </div>
  )
    /* <div>
        {allUserFishes && allUserFishes.map(fish => {
            return(
                <div key={fish._id}>
                  <p>{fish.commonName}</p>
                  <img src={fish.image} alt={fish.commonName} />
                  {fish.userId === user._id && <Link to={`/edit/fish/${fish._id}`}>Editar Troféu</Link>}
                </div>
            )
        })}
    </div> */
  
}

export default UserFishes