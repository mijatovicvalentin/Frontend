import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"
import VoziloDataService from  "../../services/vozilo.service";
import moment from 'moment';
import { NumericFormat } from "react-number-format";





export default class Vozila extends Component{

    constructor(props){
        super(props);

        this.state = {
            Vozila: []
        };


    }

    componentDidMount(){
        this.DohvatiVozila();
    }

    async DohvatiVozila(){

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
    async ObrisiVozila(id){
        const odgovor = await VoziloDataService.delete(id);
        if(odgovor.ok){
            this.DohvatiVozila();
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
                   { Vozila && Vozila.map((v,index) => (

                    <tr key={index}>
                        <td>{v.naziv}</td>
                        <td className="broj">
                            <NumericFormat
                                value={v.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/>
                        </td>

                        <td className="naslovdatum">
                    {v.datumPocetka}
                    {moment.utc(v.datumPocetka).format("DD. MM. YYYY. HH:mm")}
                        </td>
                        <td>{v.djelatnik }</td>
                       
                        <td>{v.tezina}</td>
      
                        <td>
                        <Link className="btn btn-primary gumb"
                            to={`/vozila/${v.id}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.ObrisiVozila(v.id)}>
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