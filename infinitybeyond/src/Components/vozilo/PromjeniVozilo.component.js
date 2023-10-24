import React, { Component } from "react";
import VoziloDataService from  "../../services/vozilo.service";
import DjelatnikDataService from "../../services/djelatnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';





export default class PromjeniDjelatnik extends Component {

  constructor(props) {
    super(props);

   
       

    this.vozilo = this.DohvatiloVozilo();
    this.promjeniVozilo = this.PromjeniVozilo(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.djelatnik = this.Dohvatidjelatnik();
    

  
    this.state = {
      voz: {},
      dje: [],
      sifraDje:0,
    };

  }



  async DohvatiloVozilo() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await VoziloDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          voz: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async PromjeniVozilo(vozila) {
    const odgovor = await VoziloDataService.post(vozila);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/vozila';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async Dohvatidjelatnik() {
    // console.log('Dohvaćam vrstadjelatnika');
     await DjelatnikDataService.get()
       .then(response => {
         this.setState({
          dje: response.data,
          sifraDje: response.data[0].sifra
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('naziv'));
    console.log(podaci.get('cijena'));
    console.log(podaci.get('datum_proizvodnje'));
    console.log(podaci.get('djelatnik'));
    console.log(podaci.get('tezina'));
    let datum = moment.utc(podaci.get('datum_proizvodnje') + ' ' + podaci.get('vrijeme'));
    console.log(datum);

    this.DodajVozilo({
      naziv: podaci.get('naziv'),
      cijena: parseFloat(podaci.get('cijena')),
      datum_proizvodnje: datum,
      djelatnik: podaci.get('djelatnik'),
      tezina: podaci.get('tezina'),
      sifraDje: this.state.sifraDje
    });
  }
  render() {
    
   const { voz} = this.state;
   const { dje} = this.state;



    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>naziv</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="naziv" defaultValue={voz.naziv} maxLength={255} required/>
          </Form.Group>


          
          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>cijena</Form.Label>
            <Form.Control type="text" name="cijena" placeholder="500" defaultValue={voz.cijena} />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>

         
          <Form.Group className="mb-3" controlId="datum_proizvodnje">
            <Form.Label>datum_proizvodnje</Form.Label>
            <Form.Control type="date" name="datum_proizvodnje" placeholder="" defaultValue={voz.datum_proizvodnje} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="djelatnik">
            <Form.Label>djelatnik</Form.Label>
            <Form.Select defaultValue={voz.sifraDje}  onChange={e => {
              this.setState({ sifraDje: e.target.value});
            }}>
            {dje && dje.map((djelatnik,index) => (
                  <option key={index} value={djelatnik.sifra}>{djelatnik.naziv}</option>

            ))}
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3" controlId="tezina">
            <Form.Label>tezina</Form.Label>
            <Form.Control type="text" name="tezina kg" placeholder="2000000" defaultValue={voz.tezina}  />
            <Form.Text className="text-muted">
             Ne smije biti negativan
            </Form.Text>
          </Form.Group>
        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/vozilo`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni Vozilo
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}