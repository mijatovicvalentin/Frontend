import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './Components/izbornik.component';
import Pocetna from './Components/pocetna.component';
import Nadzornaploca from './Components/nadzornaploca.component';
import Korisnici from './Components/korisnik/korisnici.component';
import DodajKorisnik from './Components/korisnik/DodajKorisnik.components';
import PromjeniKorisnik from './Components/korisnik/PromjeniKorisnik.component';
import Usluge from './Components/usluga/usluga.components';
import DodajUsluga from './Components/usluga/DodajUsluga.component';
import PromjeniUslugu from './Components/usluga/PromjeniUslugu.component';
import VrsteDjelatnika from './Components/vrstadjelatnika/vrstadjelatnika.components';
import DodajVrstaDjelatnika from './Components/vrstadjelatnika/DodajVrstuDdjelatnika.component';
import PromjeniVrstuDjelatnika from './Components/vrstadjelatnika/PromjeniVrstuDjelatnika.component';


export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/Nadzornaploca' element={<Nadzornaploca />} />
        <Route path='/Korisnici' element={<Korisnici />} />
        <Route path="/korisnici/dodaj" element={<DodajKorisnik />} />
        <Route path="/korisnici/:sifra" element={<PromjeniKorisnik />} />
        <Route path='/usluge' element={<Usluge />} />
        <Route path="/usluge/dodaj" element={<DodajUsluga />} />
        <Route path="/usluge/:sifra" element={<PromjeniUslugu />} />
        <Route path='/VrsteDjelatnika' element={<VrsteDjelatnika />} />
        <Route path="/vrstedjelatnika/dodaj" element={<DodajVrstaDjelatnika />} />
        <Route path="/vrstedjelatnika/:sifra" element={<PromjeniVrstuDjelatnika />} />

      </Routes>
     
    </Router>
  );
}