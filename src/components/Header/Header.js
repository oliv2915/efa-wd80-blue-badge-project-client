import React, {useContext, useState} from "react";
import Logo from "../../assets/logo.svg"
import {LinkContainer} from "react-router-bootstrap";
import {Button, Navbar, NavbarBrand, Nav, NavItem, Form, Input, FormGroup, Label} from "reactstrap";
import UserContext from "../../context/UserContext";

export default function Header() {
    const userContext = useContext(UserContext)
    const [searchText, setSearchText] = useState("");

    const handleSearch = (event) => {
        event.preventDefault()
        console.log("fired")
    }
    
    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/"><img src={Logo} width="120" alt="logo" /></a>
                <form className="d-flex">
                    <input className="me-2" type="search" placeholder="Search" id="search" value={searchText} onChange={e => setSearchText(e.target.value)}/>
                    <button className="btn btn-primary">Search</button>
                </form>
                {
                    userContext.isAuth ?
                        <div>
                            <a href={`/profile/${userContext.user.username}`}><button className="btn btn-secondary">Profile</button></a>
                            <button className="btn btn-secondary" onClick={()=> userContext.setToken(null)}>Logout</button>
                        </div>
                    :
                        <div>
                            <a href="/signup"><button className="btn btn-secondary">Sign Up</button></a>
                            <a href="/login"><button className="btn btn-secondary">Login</button></a>
                        </div>
                }
            </nav>
            {/* <Navbar className="navbar" >
                <LinkContainer to="/">
                    <NavbarBrand>
                        <img src={Logo} width="120" alt="logo" />
                     </NavbarBrand>
                </LinkContainer>
                 <Nav>
                     <Form className="d-flex">
                         <FormGroup className="form-floating">
                             <Input type="search" placeholder="Search" id="search" value={searchText} onChange={e => setSearchText(e.target.value)}/>
                             <Label htmlFor="search">Search</Label>
                             <Button type="submit" onClick={handleSearch}>Submit Search</Button>
                         </FormGroup>
                     </Form>
                     {
                         userContext.isAuth ? 
                                 <>
                                     <NavItem className="nav-item"><LinkContainer to={`/profile/${userContext.user.username}`}><Button>Profile</Button></LinkContainer></NavItem>
                                     <NavItem className="nav-item"><Button onClick={()=> userContext.setToken(null)}>Logout</Button></NavItem>
                                 </>
                             : 
                                 <>
                                     <NavItem className="nav-item"><LinkContainer to="/signup"><Button >Sign Up</Button></LinkContainer></NavItem>
                                     <NavItem className="nav-item"><LinkContainer to="/login"><Button>Login</Button></LinkContainer></NavItem>
                                 </>
                     }
                 </Nav>
            </Navbar> */}
        </header>
    )
}