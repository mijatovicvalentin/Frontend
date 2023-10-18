import React, { Component } from "react";
import vrstedjelatnikaDataService from "../../services/vrstadjelatnika.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class DodajVrstaDjelatnika extends Component {

  constructor(props) {
    super(props);
    this.DodajVrstaDjelatnika = this.DodajVrstaDjelatnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async DodajVrstaDjelatnika(vrstadjelatnika) {
    const odgovor = await vrstedjelatnikaDataService.post(vrstadjelatnika);
    if(odgovor.ok){
      window.location.href='/Vrstadjelatnika';
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

    this.DodajVrstaDjelatnika({
      Naziv: podaci.get('naziv'),
    
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>naziv</Form.Label>
            <Form.Control type="text" name="Naziv" placeholder="Naziv Vrste djelatnika" maxLength={255} required/>
          </Form.Group>



          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/Vrstadjelatnika`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj Vrstu Djelatnika
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}