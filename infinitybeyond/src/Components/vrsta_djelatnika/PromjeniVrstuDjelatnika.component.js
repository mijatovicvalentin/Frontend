import React, { Component } from "react";
import vrstedjelatnikaDataService from "../../services/vrsta_djelatnika.services";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniVrstuDjelatnika extends Component {

  constructor(props) {
    super(props);

    this.vrstadjelatnika = this.Dohvativrsta_djelatnika();
    this.PromjeniVrstuDjelatnika = this.Promjenivrsta_djelatnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      vrstadjelatnika: {}
    };
  }


  async Dohvativrsta_djelatnika() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await vrstedjelatnikaDataService.getByid(niz[niz.length-1])
      .then(response => {
        this.setState({
          vrstadjelatnika: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async Promjenivrsta_djelatnika(vrstadjelatnika) {
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await vrstedjelatnikaDataService.put(niz[niz.length-1],vrstadjelatnika);
    if(odgovor.ok){
      window.location.href='/Vrstadjelatnika';
    }else{
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    this.Promjenivrsta_djelatnika({
        Naziv: podaci.get('naziv'),
    
    });
    
    
  }


  render() {
    
    const { vrstadjelatnika} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="Naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="Naziv" defaultValue={vrstadjelatnika.Naziv} placeholder="Naziv Vrstadjelatnika" maxLength={255} required/>
          </Form.Group>


        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/Vrstadjelatnika`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni vrstadjelatnika
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}