import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"
import VoziloDataService from  "../../services/vozilo.service";
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { NumericFormat } from "react-number-format";





export default class Vozila extends Component{

    constructor(props){
        super(props);

        this.state = {
            Vozila: []
        };

    }

    otvoriModal = () => this.setState({ prikaziModal: true });
    zatvoriModal = () => this.setState({ prikaziModal: false });


    componentDidMount(){
        this.dohvatiVozila();
    }

    async dohvatiVozila(){

        await VoziloDataService.get()
        .then(response => {
            this.setState({
                Vozila: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiVozila(sifra){
        const odgovor = await VoziloDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiVozila();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { Vozila } = this.state;

        return (
            <Container>
               <a href="/vozila/dodaj" className="btn btn-success gumb">
                Dodaj novo vozilo
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>naziv</th>
                    <th>cijena</th>
                    <th>datum_proizvodnje</th>
                    <th>djelatnik</th>
                    <th>tezina</th>
                    </tr>
                </thead>
                <tbody>
                   { Vozila && Vozila.map((Vozila,index) => (

                    <tr key={index}>
                        <td>{Vozila.naziv}</td>
                        <td className="broj">
                            <NumericFormat
                                value={Vozila.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/>
                        </td>

                        <td className="naslovdatum">
                    {Vozila.datumPocetka==null ? "Nije definirano" :
                    moment.utc(Vozila.datumPocetka).format("DD. MM. YYYY. HH:mm")}
                        </td>
                        <td>{Vozila.djelatnik }</td>
                       
                        <td>{Vozila.tezina}</td>
      
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/djelatnici/${Vozila.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiDjelatnika(Vozila.sifra)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>

               <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Djelatnik ima vrstadjelatnika.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>


            </Container>


        );
    }
}