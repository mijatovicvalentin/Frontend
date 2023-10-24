import React, { Component } from "react";
import UslugaDataService from  "../../services/usluga.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniUslugu extends Component {

  constructor(props) {
    super(props);

    this.Usluga = this.dohvatiUsluga();
    this.promjeniUsluga = this.promjeniUsluga.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      usl: {}
    };
  }


  async dohvatiUsluga() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await UslugaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          usl: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniUsluga(Usluga) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await UslugaDataService.put(niz[niz.length-1],Usluga);
    if(odgovor.ok){
      window.location.href='/usluge';
    }else{
      // pokaži grešku
      console.log(odgovor);
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
    
    const { usl} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="Naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="Naziv" defaultValue={usl.Naziv} placeholder="Naziv usluge" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Destinacija">
            <Form.Label>Destinacija</Form.Label>
            <Form.Control type="text" name="Destinacija" defaultValue={usl.destinacija} placeholder="naziv destinacije" maxLength={255} required/>
          </Form.Group>



          <Form.Group className="mb-3" controlId="Cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="text" name="Cijena" defaultValue={usl.cijena} placeholder="1000000" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>




          <Form.Group className="mb-3" controlId="nacin_placanja">
            <Form.Label>nacin_placanja</Form.Label>
            <Form.Control type="text" name="odaberite nacin plaćanja" defaultValue={usl.nacin_placanja} placeholder="1 ili 2" />
          </Form.Group>



          <Form.Group className="mb-3" controlId="broj_mjesta">
            <Form.Label>broj_mjesta</Form.Label>
            <Form.Control type="text" name="broj_mjesta" defaultValue={usl.broj_mjesta} placeholder="500" />
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
              Promjeni uslugu
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}