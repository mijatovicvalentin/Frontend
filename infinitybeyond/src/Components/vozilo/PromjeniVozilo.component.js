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
import Djelatnici from "../djelatnik/djelatnici.component";





export default class PromjeniVozilo extends Component {

  constructor(props) {
    super(props);

   
       

    this.vozilo = this.DohvatiVozilo();
    this.PromjeniVozilo = this.PromjeniVozilo(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.djelatnik = this.DohvatiDjelatnik();
    

  
    this.state = {
      vozilo: {},
      djelatnik: [],
      sifraDjelatnik:0,
    };

  }



  async DohvatiVozilo() {
    // ovo mora bolje
    //console.log('Dohvaćam grupu');
    let href = window.location.href;
    let niz = href.split('/'); 
    await VoziloDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        let g = response.data;
        g.datum_proizvodnje = moment.utc(g.datum_proizvodnje).format("yyyy-MM-DD");
        
        //console.log(g.vrijemePocetka);
        this.setState({
          vozilo: g
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
   
  

  async PromjeniVozilo(vozilo) {
    const odgovor = await VoziloDataService.post(vozilo);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/vozila';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async DohvatiDjelatnik() {
    // console.log('Dohvaćam vrstadjelatnika');
     await DjelatnikDataService.get()
       .then(response => {
         this.setState({
           djelatnik: response.data,
           sifraDjelatnik: response.data[0].sifra
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
      cijena: parseFloat(podaci.get('prezime')),
      datum_proizvodnje: datum,
      djelatnik: podaci.get('djelatnik'),
      tezina: podaci.get('tezina'),
      sifraDjelatnik: this.state.sifraDjelatnik
    });
  }


  render() {
    
   const { vozilo} = this.state;



    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>naziv</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="naziv" defaultValue={vozilo.naziv} maxLength={255} required/>
          </Form.Group>


          
          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>cijena</Form.Label>
            <Form.Control type="text" name="cijena" placeholder="500" defaultValue={vozilo.cijena} />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>

         
          <Form.Group className="mb-3" controlId="datum_proizvodnje">
            <Form.Label>datum_proizvodnje</Form.Label>
            <Form.Control type="date" name="datum_proizvodnje" placeholder="" defaultValue={vozilo.datum_proizvodnje} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="djelatnik">
            <Form.Label>djelatnik</Form.Label>
            <Form.Select defaultValue={vozilo.sifraDjelatnik}  onChange={e => {
              this.setState({ sifraSmjer: e.target.value});
            }}>
            {Djelatnici && Djelatnici.map((Djelatnik,index) => (
                  <option key={index} value={Djelatnik.sifra}>{Djelatnik.naziv}</option>

            ))}
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3" controlId="tezina">
            <Form.Label>tezina</Form.Label>
            <Form.Control type="text" name="tezina kg" placeholder="2000000" defaultValue={vozilo.tezina}  />
            <Form.Text className="text-muted">
             Ne smije biti negativan
            </Form.Text>
          </Form.Group>
        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/vozila`}>Odustani</Link>
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