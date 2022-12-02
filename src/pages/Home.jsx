import { AuthContext } from '../contexts/auth.context';
import {useContext} from "react"
import homeImage from "../images/home-image.jpg"
import { Link } from 'react-router-dom';
function Home() {
  const {loggedIn} = useContext(AuthContext);

  return (
    <>
    <div className='home-content-container box'>
      <h1 className='title'>Pesca na Área Marinha Protegida das Avencas</h1>
      <img src={homeImage} alt="zona da AMPA" className="home-img"/>
      {!loggedIn && <p className={"home-p"}>Crie uma conta ou faça login para registar as suas Pescas</p>}
      {!loggedIn && <div className='buttons-box'>
      <Link to={"/login"} className="buttons">Login</Link>
      <Link to={"/signup"} className="buttons">Criar Conta</Link>
      </div>}
      {loggedIn && <div className='buttons-box'>
      <Link to={"/add/fishery"} className="buttons">Registar Pesca</Link>
      <Link to={"/add/trash"} className="buttons">Reportar Lixo</Link>
      </div>}
    </div>
    <footer className='home-footer'>
        <p className='home-p'>Projeto desenvolvido por <a href='https://www.linkedin.com/in/prpedrosa/' target={"_blank"} className="footer-link">Pedro Pedrosa</a> em parceria com a <a href='https://www.dgrm.mm.gov.pt/' target={"_blank"} className="footer-link">DGRM</a></p>
    </footer>
    </>
  )
}

export default Home