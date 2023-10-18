import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class DodajKorisnik extends Component {

  constructor(props) {
    super(props);
    this.DodajKorisnik = this.DodajKorisnik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async DodajKorisnik(Korisnik) {
    const odgovor = await KorisnikDataService.post(Korisnik);
    if(odgovor.ok){
      window.location.href='/korisnici';
    }else{

      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n';
        }
      }

      alert(poruke);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    this.DodajKorisnik({
      Ime: podaci.get('Ime'),
      Prezime: podaci.get('Prezime'),
      Oib: podaci.get('Oib'),
      Email: podaci.get('Email')
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="Ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="Ime korisnika" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="Prezime" placeholder="Prezime korisnika" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Oib">
            <Form.Label>Oib</Form.Label>
            <Form.Control type="text" name="Oib" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="Email" placeholder="Email" />
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/korisnici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj korisnika
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}