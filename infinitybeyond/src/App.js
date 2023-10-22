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
import Djelatnici from './Components/djelatnik/djelatnici.component';
import DodajDjelatnik from './Components/djelatnik/DodajDjelatnik.component';
import PromjeniDjelatnik from './Components/djelatnik/PromjeniDjelatnik.component';
import Vozila from './Components/vozilo/vozila.component';
import DodajVozilo from './Components/vozilo/DodajVozilo.component';
import PromjeniVozilo from './Components/vozilo/PromjeniVozilo.component';



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
        <Route path='/vrstadjelatnika' element={<VrsteDjelatnika />} />
        <Route path="/vrstadjelatnika/dodaj" element={<DodajVrstaDjelatnika />} />
        <Route path="/vrstadjelvrstadjelatnikaatnika/:sifra" element={<PromjeniVrstuDjelatnika />} />
        <Route path="/djelatnici" element={<Djelatnici />} />
        <Route path="/djelatnici/dodaj" element={<DodajDjelatnik />} />
        <Route path="/djelatnici/:sifra" element={<PromjeniDjelatnik />} />
        <Route path="/vozila" element={<Vozila />} />
        <Route path="/vozila/dodaj" element={<DodajVozilo />} />
        <Route path="/vozila/:sifra" element={<PromjeniVozilo />} />

      </Routes>
     
    </Router>
  );
}