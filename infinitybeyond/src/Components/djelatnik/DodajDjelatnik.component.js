import React, { Component } from "react";
import DjelatnikDataService from "../../services/djelatnik.service";
import vrstedjelatnikaDataService from "../../services/vrsta_djelatnika.services";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";





export default class DodajDjelatnik extends Component {

  constructor(props) {
    super(props);
    this.dodajDjelatnik = this.dodajDjelatnik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Dohvativrstadjelatnika = this.Dohvativrstadjelatnika.bind(this);



    this.state = {
      vd: [],
      sifravrstadjelatnika:0
    };

  }

  

  async dodajDjelatnik(dje) {
    const odgovor = await DjelatnikDataService.post(dje);
    if(odgovor.ok){
      window.location.href='/djelatnici';
    }else{
      console.log(odgovor);
    }
  }

  componentDidMount() {
    this.Dohvativrstadjelatnika();
  }

  async Dohvativrstadjelatnika() {

   
    await vrstedjelatnikaDataService.get()
      .then(response => {
        this.setState({
          vd: response.data,
          sifravrstadjelatnika: response.data[0].id
        });

      })
      .catch(e => {
        console.log(e);
      });
  }



  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('ime'));
    console.log(podaci.get('prezime'));
    console.log(podaci.get('oib'));
    console.log(podaci.get('kontakt'));
    console.log(podaci.get('jedinstvenibroj'));
    console.log(podaci.get('vrsta_djelatnika'))

    this.dodajDjelatnik({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      oib: podaci.get('oib'),
      kontakt: podaci.get('kontakt'),
      jedinstvenibroj: podaci.get('jedinstvenibroj'),
      sifravrstadjelatnika: this.state.sifravrstadjelatnika
    });
  }


  render() { 

    const { vd} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="ime">
            <Form.Label>ime</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="ime djelatnika" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>prezime</Form.Label>
            <Form.Control type="text" name="prezime" placeholder="prezime djelatnika" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="oib">
            <Form.Label>oib</Form.Label>
            <Form.Control type="text" name="oib" placeholder="" />
          </Form.Group>



          <Form.Group className="mb-3" controlId="kontakt">
            <Form.Label>kontakt</Form.Label>
            <Form.Control type="text" name="kontakt" placeholder="kontakt" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="jedinstvenibroj">
            <Form.Label>jedinstvenibroj</Form.Label>
            <Form.Control type="text" name="jedinstvenibroj" placeholder="500" />
            <Form.Text className="text-muted">
             Ne smije biti negativan
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="vrsta_djelatnika">
            <Form.Label>vrsta_djelatnika</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ sifravrstadjelatnika: e.target.value});
            }}>
            {vd && vd.map((vd,index) => (
                  <option key={index} value={vd.sifra}>{vd.naziv} </option>

            ))}
            </Form.Select>
          </Form.Group>



          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/djelatnici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj djelatnika
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}