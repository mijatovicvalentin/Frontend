
import vrstedjelatnikaDataService from "../../services/vrstadjelatnika.service";
import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"






export default class VrsteDjelatnika extends Component{

    constructor(props){
        super(props);

        this.state = {
            VrstaD: []
        };

    }




    componentDidMount(){
        this.dohvativrstadjelatnika();
    }

    async dohvativrstadjelatnika(){

        await vrstedjelatnikaDataService.get()
        .then(response => {
            this.setState({
                VrstaD: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisivrstadjelatnika(sifra){
        const odgovor = await vrstedjelatnikaDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvativrstadjelatnika();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { VrstaDje } = this.state;

        return (
            <Container>
               <a href="/vrstadjelatnika/dodaj" className="btn btn-success gumb">
                Dodaj novu Vrstu Djelatnika
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>naziv</th>
                    </tr>
                </thead>
                <tbody>
                   { VrstaDje && VrstaDje.map((v,index) => (

                    <tr key={index}>
                        <td>{v.naziv}</td>
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/vrstadjelatnika/${v.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisivrstadjelatnika(v.sifra)}>
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