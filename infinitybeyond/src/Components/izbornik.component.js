import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../logo.svg';


export default class izbornik extends Component{


    render(){
        return (

            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> InfinityBeyond App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/nadzornaploca">Nadzorna ploča</Nav.Link>
                  <NavDropdown title="Izbornik" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/korisnici">Korisnici</NavDropdown.Item>
                    <NavDropdown.Item href="/usluge">Usluge</NavDropdown.Item>
                    <NavDropdown.Item href="/vrsta_djelatnika">Vrste Djelatnika</NavDropdown.Item>
                    <NavDropdown.Item href="/djelatnici">Djelatnici</NavDropdown.Item>
                    <NavDropdown.Item href="/vozila">Vozila</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item target="_blank" href="/https://mijatovic1878-001-site1.htempurl.com/swagger/index.html">
                      Swagger
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>



        );
    }
}