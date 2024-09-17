import { useState, useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { AuthContext } from "../contexts/auth.context"
import logo from "../images/fish-logo.png"

function NavBar() {
  const { loggedIn, logout } = useContext(AuthContext)
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleToggleCollapse = () => setToggleCollapse(!toggleCollapse)

  const closeNavBar = () => {
    setExpanded(false)
    setToggleCollapse(false)
  }

  return (
    <Navbar expand='lg' expanded={expanded} className='nav' fixed='top'>
      <Container>
        <Link to='/'>
          <img src={logo} alt='DGRM logo' style={{ height: "7vh" }} onClick={closeNavBar} />
        </Link>
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          style={{
            backgroundColor: toggleCollapse ? "rgba(52, 156, 241, 0.4)" : "rgba(0,48,87,0.4)",
            border: "3px solid black",
            boxShadow: toggleCollapse ? "0 0 10px 0 black" : "none",
          }}
          onClick={() => {
            handleToggleCollapse()
            setExpanded(expanded ? false : "expanded")
          }}
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/fishes' className={"nav-link"} onClick={closeNavBar}>
              Espécies
            </NavLink>
            <NavLink to='/add/trash' className={"nav-link"} onClick={closeNavBar}>
              Reportar Lixo
            </NavLink>
            {loggedIn && (
              <>
                <NavLink to='/add/fishery' className={"nav-link"} onClick={closeNavBar}>
                  Registar Pesca
                </NavLink>
                <NavLink to='/userfishes' className={"nav-link"} onClick={closeNavBar}>
                  Troféus
                </NavLink>
                <p className='giveSpace'></p>
                <NavLink to='/profile' className={"nav-link"} onClick={closeNavBar}>
                  Perfil
                </NavLink>
                <Link
                  to='/'
                  onClick={() => {
                    logout()
                    closeNavBar()
                  }}
                  className={"nav-link logoutlink"}
                >
                  Logout
                </Link>
              </>
            )}
            {!loggedIn && (
              <>
                <p className='giveSpace'></p>
                <NavLink to='/login' className={"nav-link"} onClick={closeNavBar}>
                  Log In
                </NavLink>
                <NavLink to='/signup' className={"nav-link"} onClick={closeNavBar}>
                  Sign Up
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
