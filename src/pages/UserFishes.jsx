import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../contexts/auth.context';
import { Link } from "react-router-dom";

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
    <div>
        {allUserFishes && allUserFishes.map(fish => {
            return(
                <div>
                  <p>{fish.commonName}</p>
                  <img src={fish.image} alt={fish.commonName} />
                  {fish.userId === user._id && <Link to={`/edit/fish/${fish._id}`}>Editar Troféu</Link>}
                </div>
            )
        })}
    </div>
  )
}

export default UserFishes