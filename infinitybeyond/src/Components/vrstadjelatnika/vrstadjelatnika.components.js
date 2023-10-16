import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import vrstedjelatnikaDataService from "../../services/vrstedjelatnika.service";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class VrsteDjelatnika extends Component{

    constructor(props){
        super(props);

        this.state = {
            vrstedjelatnika: []
        };

    }

    componentDidMount(){
        this.dohvatiVrstuDjelatnika();
    }

    async dohvatiVrstuDjelatnika(){

        await vrstedjelatnikaDataService.get()
        .then(response => {
            this.setState({
                vrsteDjelatnika: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiVrstuDjelatnika(sifra){
        const odgovor = await vrstedjelatnikaDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiVrstuDjelatnika();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { vrstedjelatnika } = this.state;

        return (
            <Container>
               <a href="/vrstedjelatnika/dodaj" className="btn btn-success gumb">
                Dodaj novu Vrstu Djelatnika
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                      
                    </tr>
                </thead>
                <tbody>
                   { vrstedjelatnika && vrstedjelatnika.map((vrstadjelatnika,index) => (

                    <tr key={index}>
                        <td>{vrstadjelatnika.naziv}</td>
                   
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/vrstedjelatnika/${vrstadjelatnika.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiVrstuDjelatnika(vrstadjelatnika.sifra)}>
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