import React, { Component } from "react";
import UslugaDataService from  "../../services/usluga.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";






export default class DodajUsluga extends Component {

  constructor(props) {
    super(props);
    this.DodajKorisnik = this.DodajUsluga.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async DodajUsluga(Usluga) {
    const odgovor = await UslugaDataService.post(Usluga);
    if(odgovor.ok){
      window.location.href='/usluge';
    }else{

      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n'
        }
      }

      alert(poruke);
    }
  }




  handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    
    {}
    this.DodajUsluga({
      Naziv: podaci.get('Naziv'),
      destinacija: podaci.get('destinacija'),
      cijena: parseFloat(podaci.get('cijena')),
      broj_mjesta: (podaci.get('broj_mjesta')),
      nacin_placanja: parseFloat(podaci.get('nacin_placanja')),
    
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="Naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="Naziv" placeholder="Naziv usluge" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Destinacija">
            <Form.Label>Destinacija</Form.Label>
            <Form.Control type="text" name="Destinacija" placeholder="naziv destinacije" maxLength={255} required/>
          </Form.Group>



          <Form.Group className="mb-3" controlId="Cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="text" name="Cijena" placeholder="1000000" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>




          <Form.Group className="mb-3" controlId="nacin_placanja">
            <Form.Label>nacin_placanja</Form.Label>
            <Form.Control type="text" name="odaberite nacin plaćanja" placeholder="1 - 2" />
          </Form.Group>



          <Form.Group className="mb-3" controlId="broj_mjesta">
            <Form.Label>broj_mjesta</Form.Label>
            <Form.Control type="text" name="broj_mjesta" placeholder="50" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>
          

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/usluge`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj uslugu
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}