import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"
import UslugaDataService from  "../../services/usluga.service";



export default class Usluge extends Component{

    constructor(props){
        super(props);

        this.state = {
            Usluge: []
        };

    }

    componentDidMount(){
        this.dohvatiUsluge();
    }

    async dohvatiUsluge(){

        await UslugaDataService.get()
        .then(response => {
            this.setState({
                Usluge: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiUslugu(sifra){
        const odgovor = await UslugaDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiUsluge();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { Usluge } = this.state;

        return (
            <Container>
               <a href="/usluge/dodaj" className="btn btn-success gumb">
                Dodaj novu uslugu
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Destinacija</th>
                        <th>nacin_placanja</th>
                        <th>cijena</th>
                        <th>broj_mjesta</th>
                    </tr>
                </thead>
                <tbody>
                   { Usluge && Usluge.map((Usluga,index) => (

                    <tr key={index}>
                        <td>{Usluga.naziv}</td>
                        <td>{Usluga.destinacija}</td>
                        <td>{Usluga.nacin_placanja}</td>

                        <td className="broj">
                            <NumericFormat
                                value={Usluga.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/>
                              <td>{Usluga.broj_mjesta}</td>

                        </td>
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/usluge/${Usluga.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiUslugu(Usluga.sifra)}>
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