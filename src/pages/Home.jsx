import { AuthContext } from '../contexts/auth.context';
import {useContext} from "react"
import homeImage from "../images/home-image.jpg"
import { Link } from 'react-router-dom';
function Home() {
  const {loggedIn, user} = useContext(AuthContext);
  //do button to display weather

  return (
    <>
    <div className='content-container box'>
      <h1 className='title'>Pescar na Área Marinha Protegida das Avencas</h1>
      <img src={homeImage} alt="zona da AMPA" className="home-img"/>
      {!loggedIn && <p className={"home-p"}>Crie uma conta ou faça login para registar as suas capturas</p>}
      {!loggedIn && <div className='buttons-box'>
      <Link to={"/login"} className="buttons">Login</Link>
      <Link to={"/signup"} className="buttons">Criar Conta</Link>
      </div>}
      {loggedIn && <div className='buttons-box'>
      <Link to={"/add/fishery"} className="buttons">Registar Captura</Link>
      <Link to={"/add/trash"} className="buttons">Reportar Lixo Marinho</Link>
      </div>}
    </div>
    <footer className='home-footer'>
        <p className='home-p'>Projeto desenvolvido por Pedro Pedrosa em parceria com a DGRM</p>
    </footer>
    </>
  )
}

export default Home