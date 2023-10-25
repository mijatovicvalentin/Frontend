import React, { Component } from "react";
import VoziloDataService from "../../services/vozilo.service";
import DjelatnikDataService from "../../services/djelatnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';



export default class PromjeniGrupa extends Component {

  constructor(props) {
    super(props);

    

    this.vozilo = this.dohvatiVozilo();
    this.promjeniVozilo = this.promjeniVozilo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.djelatnici = this.dohvatiDjelatnici();
    this.dodajDjelatnika = this.dodajDjelatnika.bind(this);



    this.state = {
      vozilo: {},
      djelatnici: [],
      sifradjelatnici:0,
    };
  }




  async dohvatiVozilo() {
    // ovo mora bolje
    //console.log('Dohvaćam grupu');
    let href = window.location.href;
    let niz = href.split('/'); 
    await VoziloDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        let g = response.data;
        
        this.setState({
          vozilo: g
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  async promjeniVozilo(vozilo) {
    const odgovor = await VoziloDataService.post(vozilo);
    if(odgovor.ok){
      window.location.href='/vozila';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async dohvatiDjelatnici() {
     await DjelatnikDataService.get()
       .then(response => {
         this.setState({
           djelatnici: response.data,
           sifradjelatnici: response.data[0].id
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   async dodajDjelatnika(vozilo, djelatnici){
    const odgovor = await VoziloDataService.dodajDjelatnika(vozilo, djelatnici);
    if(odgovor.ok){
     this.dohvatiDjelatnici();
    }else{
    }
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

    this.promjeniGrupa({
      naziv: podaci.get('naziv'),
      cijena: parseFloat(podaci.get('prezime')),
      datum_proizvodnje: datum,
      djelatnik: podaci.get('djelatnik'),
      tezina: podaci.get('tezina'),
      sifradjelatnici: this.state.sifradjelatnici
    });
    
  }



  render() {
    
   const { vozilo} = this.state;
   const { djelatnici} = this.state;



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
            <Form.Select defaultValue={vozilo.sifraDje}  onChange={e => {
              this.setState({ sifradjelatnici: e.target.value});
            }}>
            {djelatnici && djelatnici.map((Djelatnici,index) => (
                  <option key={index} value={Djelatnici.id}>{Djelatnici.naziv}</option>

            ))}
            </Form.Select>
          </Form.Group>

          

               
          <Form.Group className="mb-3" controlId="tezina">
            <Form.Label>tezina</Form.Label>
            <Form.Control type="text" name="tezina" placeholder="1000000" defaultValue={vozilo.tezina} maxLength={255} required/>
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