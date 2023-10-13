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

   
    this.usluga = this.dohvatiUsluga();
    this.promjeniUsluga = this.promjeniUsluga.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      usluga: {}
    };

  }



  async dohvatiUsluga() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await UslugaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          usluga: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async promjeniUsluga(usluga) {
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await UslugaDataService.put(niz[niz.length-1],usluga);
    if(odgovor.ok){
      window.location.href='/usluge';
    }else{
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
  

    this.promjeniUsluga({
        Naziv: podaci.get('Naziv'),
      destinacija: podaci.get('destinacija'),
      cijena: parseFloat(podaci.get('cijena')),
      broj_mjesta: (podaci.get('broj_mjesta')),
      nacin_placanja: podaci.get('nacin_placanja'),
    
    });
    
  }


  render() {
    
   const { usluga} = this.state;


    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="Naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="Naziv" defaultValue={usluga.Naziv} placeholder="Naziv usluge" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Destinacija">
            <Form.Label>Destinacija</Form.Label>
            <Form.Control type="text" name="Destinacija" defaultValue={usluga.destinacija} placeholder="naziv destinacije" maxLength={255} required/>
          </Form.Group>



          <Form.Group className="mb-3" controlId="Cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="text" name="Cijena" defaultValue={usluga.cijena} placeholder="500" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>




          <Form.Group className="mb-3" controlId="nacin_placanja">
            <Form.Label>nacin_placanja</Form.Label>
            <Form.Control type="text" name="odaberite nacin plaćanja" defaultValue={usluga.nacin_placanja} placeholder="50" />
          </Form.Group>



          <Form.Group className="mb-3" controlId="broj_mjesta">
            <Form.Label>broj_mjesta</Form.Label>
            <Form.Control type="text" name="broj_mjesta" defaultValue={usluga.broj_mjesta} placeholder="500" />
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