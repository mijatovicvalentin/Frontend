import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import vrstedjelatnikaDataService from "../../services/vrsta_djelatnika.services";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class VrstaDjelatnika extends Component{

    constructor(props){
        super(props);

        this.state = {
            vd: []
        };

    }

    componentDidMount(){
        this.dohvativrstadjelatnika();
    }

    async dohvativrstadjelatnika(){

        await vrstedjelatnikaDataService.get()
        .then(response => {
            this.setState({
                vd: response.data
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

        const { vd } = this.state;

        return (
            <Container>
               <a href="/vrsta_djelatnika/dodaj" className="btn btn-success gumb">
                Dodaj novu Vrstu Djelatnika
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>naziv</th>
                     
                    </tr>
                </thead>
                <tbody>
                   { vd && vd.map((vdd,index) => (

                    <tr key={index}>
                        <td>{vdd.naziv}</td>
                        
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/vrsta_djelatnika/${vdd.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisivrstadjelatnika(vdd.sifra)}>
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