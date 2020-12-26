import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Paths from './../../paths'
import './../stylingModules/Navbar.scss'

const NavbarUtil = (props) => {
    return(
        <Navbar bg="primary" variant="dark" style={{  width: window.innerWidth }} className="navbar">
            <Navbar.Brand><b>{props.welcomeText}</b></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link className="navLinks" href={Paths.Home}>Home</Nav.Link>
                <Nav.Link className="navLinks" href={Paths.Attendance}>Attendance</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={props.logoutFn}>Logout</Button>
        </Navbar>
    )
}

export default NavbarUtil