import React, { Component } from "react";
import DjelatnikDataService from  "../../services/djelatnik.service";
import vrstedjelatnikaService from "../../services/vrsta_djelatnika.services";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";





export default class PromjeniDjelatnik extends Component {

  constructor(props) {
    super(props);

   
       

    this.djelatnik = this.DohvatiDjelatnik();
    this.promjeniDjelatnik = this.PromjeniDjelatnik(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.vrstadjelatnika = this.Dohvativrstadjelatnika();

  
    this.state = {
      d: {},
      vd: [],
      sifravrstadjelatnika:0,
    };

  }



  async DohvatiDjelatnik() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await DjelatnikDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          d: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async PromjeniDjelatnik(djelatnik) {
    const odgovor = await DjelatnikDataService.post(djelatnik);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/djelatnici';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async Dohvativrstadjelatnika() {
    // console.log('Dohvaćam vrstadjelatnika');
     await vrstedjelatnikaService.get()
       .then(response => {
         this.setState({
          vd: response.data,
           sifravrstadjelatnika: response.data[0].sifra
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
    console.log(podaci.get('ime'));
    console.log(podaci.get('prezime'));
    console.log(podaci.get('oib'));
    console.log(podaci.get('kontakt'));
    console.log(podaci.get('jedinstvenibroj'));

    this.DodajDjelatnik({
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
   const { d} = this.state;



    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="ime">
            <Form.Label>ime</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="ime djelatnika" defaultValue={d.ime} maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>prezime</Form.Label>
            <Form.Control type="text" name="prezime" placeholder="prezime djelatnika" defaultValue={d.prezime} maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="oib">
            <Form.Label>oib</Form.Label>
            <Form.Control type="text" name="oib" placeholder="" defaultValue={d.oib} />
          </Form.Group>



          <Form.Group className="mb-3" controlId="kontakt">
            <Form.Label>kontakt</Form.Label>
            <Form.Control type="text" name="kontakt" placeholder="kontakt" defaultValue={d.kontakt} maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="jedinstvenibroj">
            <Form.Label>jedinstvenibroj</Form.Label>
            <Form.Control type="text" name="jedinstvenibroj" placeholder="500" defaultValue={d.jedinstvenibroj} />
            <Form.Text className="text-muted">
             Ne smije biti negativan
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="vrstadjelatnika">
            <Form.Label>vrstadjelatnika</Form.Label>
            <Form.Select defaultValue={d.vrstadjelatnika} onChange={e => {
              this.setState({ sifravrstadjelatnika: e.target.value});
            }}>
            {vd && vd.map((vrstadjelatnika,index) => (
                  <option key={index} value={vrstadjelatnika.sifra}></option>

            ))}
            </Form.Select>
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/djelatnici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni djelatnika
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}