import React, { Component } from "react";
import vrstedjelatnikaDataService from "../../services/vrstadjelatnika.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniVrstuDjelatnika extends Component {

  constructor(props) {
    super(props);

    this.vrstadjelatnika = this.dohvatiVrstuDjelatnika();
    this.PromjeniVrstuDjelatnika = this.PromjeniVrstuDjelatnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      vrstadjelatnika: {}
    };
  }


  async dohvativrstadjelatnika() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await vrstedjelatnikaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          vrstadjelatnika: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniVrstDjelatnika(vrstadjelatnika) {
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


    this.promjeniKorisnik({
        Naziv: podaci.get('naziv'),
    
    });
    
    
  }


  render() {
    
    const { vrstadjelatnika} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>naziv</Form.Label>
            <Form.Control type="text" name="naziv" defaultValue={vrstadjelatnika.Naziv} placeholder="Naziv Vrstadjelatnika" maxLength={255} required/>
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