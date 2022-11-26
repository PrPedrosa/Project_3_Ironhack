import {useState, useEffect, useContext} from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../contexts/auth.context';
/* import logo from "../images/DGRM_logo.png"
import userIcon from "../images/user-icon.png"
import styled from 'styled-components' */


function NavBar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/signup" style={{alignSelf: "center"}}>Sign Up</NavLink>
            <Nav.Link href="/login">Log In</Nav.Link>
            <NavLink to="/add/fishery">Registar Pesca</NavLink>
            <NavLink to="/profile">Perfil</NavLink>
            {user && <p>Olá {user.name}</p>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}
    /* <StyledNavbar>
      <Link to={"/"}><img src={logo} alt="logo" className='logo'/></Link>

      <div className='dropdown'>
        <NavLink to={"/login"} className={url === "/login" ? "using navLinks" : "navLinks"}>Log In</NavLink>
        <NavLink to={"/signup"} className={url === "/signup" ? "using navLinks" : "navLinks"}>Sign Up</NavLink>
        <NavLink to={"/add/fishery"} className={url === "/add/fishery" ? "using navLinks" : "navLinks"}>Registar Pesca</NavLink> 
        <NavLink to={"/profile"}><img src={userIcon} alt="user icon" className='userIcon'/></NavLink> 
      </div>
    </StyledNavbar> */
    

/* const StyledNavbar = styled.nav`
    height: 8vh;
    background-color: #6b6bff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
        display: flex;
        align-items: center;  
    }

    a{
        margin-right: 1vw;
    }

    .navLinks{
        text-decoration: none;
        color: white;
        border: 2px solid white;
        border-radius: 10px;
        padding: 1vh; 
    }

    .navLinks:hover,
    .using{
        border: 2px solid black;
    }

    .logo{
        height: 8vh
    }

    .userIcon{
        height: 6vh;
    }
` */

export default NavBar