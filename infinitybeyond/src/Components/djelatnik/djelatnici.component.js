import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"
import DjelatnikDataService from  "../../services/djelatnik.service";
import { Modal } from 'react-bootstrap';




export default class Djelatnici extends Component{

    constructor(props){
        super(props);

        this.state = {
            Djelatnici: []
        };

    }

    otvoriModal = () => this.setState({ prikaziModal: true });
    zatvoriModal = () => this.setState({ prikaziModal: false });


    componentDidMount(){
        this.dohvatiDjelatnici();
    }

    async dohvatiDjelatnici(){

        await DjelatnikDataService.get()
        .then(response => {
            this.setState({
                Djelatnici: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiDjelatnika(sifra){
        const odgovor = await DjelatnikDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiDjelatnici();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { Djelatnici } = this.state;

        return (
            <Container>
               <a href="/djelatnici/dodaj" className="btn btn-success gumb">
                Dodaj novog Djelatnika
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>ime</th>
                    <th>prezime</th>
                    <th>oib</th>
                    <th>kontakt</th>
                    <th>jedinstvenibroj</th>
                    <th>vrstadjelatnika</th>
                    </tr>
                </thead>
                <tbody>
                   { Djelatnici && Djelatnici.map((Djelatnici,index) => (

                    <tr key={index}>
                        <td>{Djelatnici.ime}</td>
                        <td>{Djelatnici.prezime}</td>
                        <td>{Djelatnici.oib }</td>
                        <td>{Djelatnici.jedinstvenibroj}</td>
                        <td>{Djelatnici.vrstadjelatnika}</td>
      
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/djelatnici/${Djelatnici.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiDjelatnika(Djelatnici.sifra)}>
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