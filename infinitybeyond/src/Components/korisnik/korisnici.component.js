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

    async obrisiKorisnik(sifra){
        const odgovor = await KorisnikDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiKorisnici();
        }else{
            alert(odgovor.poruka);
        }
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
                   { Korisnici && Korisnici.map((korisnik,index) => (

                    <tr key={index}>
                        <td>{korisnik.ime}</td>
                        <td>{korisnik.prezime}</td>
                        <td>{korisnik.email}</td>
                        <td>{korisnik.oib}</td>
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/korisnici/${korisnik.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiKorisnik(korisnik.sifra)}>
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