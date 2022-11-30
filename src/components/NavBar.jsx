import {useState, useEffect, useContext} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../contexts/auth.context';
import logo from "../images/DGRM_logo.png"



function NavBar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  const {user, loggedIn, logout} = useContext(AuthContext)
  const [toggleCollapse, setToggleCollapse] = useState(false)

  const handleToggleCollapse = () => setToggleCollapse(!toggleCollapse)

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <Navbar  expand="lg" className='nav' sticky="top">
      <Container>
        <NavLink to="/"><img src={logo} alt="DGRM logo" style={{height: "7vh"}}/></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor: "rgb(0, 181, 226)", border: "3px solid black", boxShadow: toggleCollapse ? "0 0 10px 0 black" : "none"}} onClick={handleToggleCollapse}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/fishes" className={"nav-link"}>Espécies</NavLink>
            <NavLink to="/add/trash" className={"nav-link"}>Reportar Lixo Marinho</NavLink>
            {loggedIn && 
            <>
            <NavLink to="/add/fishery" className={"nav-link"}>Registar Captura</NavLink>
            <NavLink to="/userfishes" className={"nav-link"}>Troféus</NavLink>
            <NavLink to="/profile" className={"nav-link"}>Perfil</NavLink>
            <NavLink to="/" onClick={logout} className={"nav-link"}>Logout</NavLink>
            </>}
            {!loggedIn && 
            <>
              <NavLink to="/login" className={"nav-link"}>Log In</NavLink>
              <NavLink to="/signup" className={"nav-link"}>Sign Up</NavLink>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar