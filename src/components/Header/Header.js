import React from "react";
import Logo from "../../assets/logo.svg"
import {LinkContainer} from "react-router-bootstrap";
import {Button, Navbar, NavbarBrand, Nav, NavItem} from "reactstrap";

export default function Header({token, logout}) {
    
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
                        token ? 
                                <>
                                    <NavItem className="nav-item"><LinkContainer to="/profile"><Button>Profile</Button></LinkContainer></NavItem>
                                    <NavItem className="nav-item"><Button onClick={logout}>Logout</Button></NavItem>
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