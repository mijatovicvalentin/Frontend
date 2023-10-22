import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniKorisnik extends Component {

  constructor(props) {
    super(props);

    this.Korisnik = this.dohvatiKorisnik();
    this.PromjeniKorisnik = this.promjeniKorisnik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      korisnik: {}
    };
  }


  async dohvatiKorisnik() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await KorisnikDataService.getBySifra(niz[niz.length-1])
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

  async promjeniKorisnik(Korisnik) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await KorisnikDataService.put(niz[niz.length-1],Korisnik);
    if(odgovor.ok){
      window.location.href='/korisnici';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    
    e.preventDefault();

    
    const podaci = new FormData(e.target);

    this.promjeniKorisnik({
        Ime: podaci.get('Ime'),
        Prezime: podaci.get('Prezime'),
        Oib: podaci.get('Oib'),
        Email: podaci.get('Email')
    });
    
  }


  render() {
    
    const { korisnik} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="Ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="unknown" maxLength={255} defaultValue={korisnik.Ime} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="Prezime" placeholder="unknown" defaultValue={korisnik.Prezime}  required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="Email" placeholder="unknown@gmail.com" defaultValue={korisnik.Email}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Oib">
            <Form.Label>Oib</Form.Label>
            <Form.Control type="text" name="Oib" placeholder="" defaultValue={korisnik.Oib}  />
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/korisnici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni korisnika
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}