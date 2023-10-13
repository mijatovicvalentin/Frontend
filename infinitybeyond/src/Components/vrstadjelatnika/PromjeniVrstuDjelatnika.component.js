import React, { Component } from "react";
import vrstedjelatnikaDataService from "../../services/vrstedjelatnika.service";
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


  async dohvatiKorisnik() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await vrstedjelatnikaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          korisnik: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniVrstDjelatnika(vrstadjelatnika) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await vrstedjelatnikaDataService.put(niz[niz.length-1],vrstadjelatnika);
    if(odgovor.ok){
      window.location.href='/vrstedjelatnika';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.promjeniKorisnik({
        Naziv: podaci.get('Naziv'),
    
    });
    
  }


  render() {
    
    const { vrstadjelatnika} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="Naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="Naziv" defaultValue={vrstadjelatnika.Naziv} placeholder="Naziv vrstedjelatnika" maxLength={255} required/>
          </Form.Group>


        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/vrstedjelatnika`}>Odustani</Link>
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