import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"
import DjelatnikDataService from  "../../services/djelatnik.service";




export default class Djelatnici extends Component{

    constructor(props){
        super(props);

        this.state = {
            Djelatnici: []
        };

    }




    componentDidMount(){
        this.DohvatiDjelatnici();
    }

    async DohvatiDjelatnici(){

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

    async ObrisiDjelatnika(sifra){
        const odgovor = await DjelatnikDataService.delete(sifra);
        if(odgovor.ok){
            this.DohvatiDjelatnici();
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
                    <th>vrsta_djelatnika</th>
                    </tr>
                </thead>
                <tbody>
                   { Djelatnici && Djelatnici.map((Djelatnici,index) => (

                    <tr key={index}>
                        <td>{Djelatnici.ime}</td>
                        <td>{Djelatnici.prezime}</td>
                        <td>{Djelatnici.oib }</td>
                        <td>{Djelatnici.kontakt }</td>        
                        <td>{Djelatnici.jedinstvenibroj}</td>
                        <td>{Djelatnici.vrsta_djelatnika}</td>
      
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/djelatnici/${Djelatnici.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.ObrisiDjelatnika(Djelatnici.sifra)}>
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