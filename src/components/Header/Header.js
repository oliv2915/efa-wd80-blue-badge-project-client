import React, {useContext} from "react";
import Logo from "../../assets/logo.svg"
import {LinkContainer} from "react-router-bootstrap";
import {Button, Navbar, NavbarBrand, Nav, NavItem} from "reactstrap";
import UserContext from "../../context/UserContext";

export default function Header() {
    const userContext = useContext(UserContext)
    
    return (
        <header>
           <Navbar className="navbar" >
               <LinkContainer to="/">
                   <NavbarBrand>
                       <img src={Logo} width="120" alt="logo" />
                    </NavbarBrand>
               </LinkContainer>
                <Nav>
                    {
                        userContext.isAuth ? 
                                <>
                                    <NavItem className="nav-item"><LinkContainer to="/profile"><Button>Profile</Button></LinkContainer></NavItem>
                                    <NavItem className="nav-item"><Button onClick={()=> userContext.setToken(null)}>Logout</Button></NavItem>
                                </>
                            : 
                                <>
                                    <NavItem className="nav-item"><LinkContainer to="/signup"><Button >Sign Up</Button></LinkContainer></NavItem>
                                    <NavItem className="nav-item"><LinkContainer to="/login"><Button>Login</Button></LinkContainer></NavItem>
                                </>
                    }
                </Nav>
           </Navbar>
        </header>
    )
}