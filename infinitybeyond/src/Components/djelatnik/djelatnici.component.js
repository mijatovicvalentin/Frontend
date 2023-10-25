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

    async obrisiDjelatnik(id){
        const odgovor = await DjelatnikDataService.delete(id);
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
                   { Djelatnici && Djelatnici.map((Dj,index) => (

                    <tr key={index}>
                        <td>{Dj.ime}</td>
                        <td>{Dj.prezime}</td>
                        <td>{Dj.oib }</td>
                        <td>{Dj.kontakt }</td>        
                        <td>{Dj.jedinstvenibroj}</td>
                        <td>{Dj.vrsta_djelatnika}</td>
      
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/djelatnici/${Dj.id}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiDjelatnik(Dj.id)}>
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