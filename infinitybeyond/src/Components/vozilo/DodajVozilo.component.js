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





export default class DodajVozilo extends Component {

  constructor(props) {
    super(props);
    this.dodajVozilo = this.DodajVozilo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.DohvatiDjelatnici = this.DohvatiDjelatnici.bind(this);

    this.state = {
      djelatnici: [],
      sifradjelatnik:0
    };

  }



  async   DodajVozilo(Vozilo) {
    const odgovor = await VoziloDataService.post(Vozilo);
    if(odgovor.ok){
      window.location.href='/vozila';
    }else{

      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n';
        }
      }

      alert(poruke);
    }
  }

  componentDidMount() {
    this.DohvatiDjelatnici();
  }

  async DohvatiDjelatnici() {

    await DjelatnikDataService.get()
      .then(response => {
        this.setState({
          djelatnici: response.data,
          sifradjelatnik: response.data[0].id
        });

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
    

    this.dodajVozilo({
      naziv: podaci.get('naziv'),
      cijena: parseFloat(podaci.get('cijena')),
      datum_proizvodnje: datum,
      djelatnik: podaci.get('djelatnik'),
      tezina: podaci.get('tezina'),
      sifradjelatnik: this.state.sifradjelatnik
    });
  }


  render() { 

    const { djelatnici} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>naziv</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="naziv" maxLength={255} required/>
          </Form.Group>


          
          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>cijena</Form.Label>
            <Form.Control type="text" name="cijena" placeholder="100000" />
            <Form.Text className="text-muted">
             Ne smije biti negativna
            </Form.Text>
          </Form.Group>

         
          <Form.Group className="mb-3" controlId="datum_proizvodnje">
            <Form.Label>datum_proizvodnje</Form.Label>
            <Form.Control type="date" name="datum_proizvodnje" placeholder=""  />
          </Form.Group>

         

          <Form.Group className="mb-3" controlId="djelatnik">
            <Form.Label>djelatnik</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ sifradjelatnik: e.target.value});
            }}>
            {djelatnici && djelatnici.map((Djelatnik,index) => (
                  <option key={index} value={Djelatnik.id}>{Djelatnik.ime} {Djelatnik.prezime}</option>

            ))}
            </Form.Select>
          </Form.Group>

     
          <Form.Group className="mb-3" controlId="tezina">
            <Form.Label>tezina</Form.Label>
            <Form.Control type="text" name="tezina" placeholder="1000000" maxLength={255} required/>
          </Form.Group>

          

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/vozila`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj Vozilo
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}