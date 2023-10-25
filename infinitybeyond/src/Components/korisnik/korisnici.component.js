import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import KorisnikDataService from "../../services/korisnik.service";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class Korisnici extends Component{

    constructor(props){
        super(props);

        this.state = {
            Korisnici: []
            
        };

    }

    componentDidMount(){
        this.dohvatiKorisnici();
    }

    async dohvatiKorisnici(){

        await KorisnikDataService.get()
        .then(response => {
            this.setState({
                Korisnici: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiKorisnika(id){
        const odgovor = await KorisnikDataService.delete(id);
        if(odgovor.ok){  window.location.href='/korisnici'; }
        else {	 alert(odgovor.poruka); }
        }


    render(){

        const { Korisnici } = this.state;

        return (
            <Container>
               <a href="/korisnici/dodaj" className="btn btn-success gumb">
                Dodaj novog korisnika
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Oib</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                   { Korisnici && Korisnici.map((Korisnik,index) => (

                    <tr key={index}>
                        <td>{Korisnik.ime}</td>
                        <td>{Korisnik.prezime}</td>
                        <td>{Korisnik.oib}</td>
                        <td>{Korisnik.email}</td>
                       
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/korisnici/${Korisnik.id}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiKorisnika(Korisnik.id)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>


                   ))}
                </tbody>
               </Table>



            </Container>


        );
    }
}