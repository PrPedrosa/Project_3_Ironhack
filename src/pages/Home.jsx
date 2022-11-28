import { AuthContext } from '../contexts/auth.context';
import {useContext} from "react"
function Home() {
  const {logout} = useContext(AuthContext);
  //do button to display weather

  return (
    <div>
    <div>Home</div>
    <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home