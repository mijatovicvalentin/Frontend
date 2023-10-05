import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './Components/izbornik.component';
import Pocetna from './Components/pocetna.component';
import Nadzornaploca from './Components/nadzornaploca.component';
import Korisnici from './Components/korisnik/korisnici.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/Nadzornaploca' element={<Nadzornaploca />} />
        <Route path='/Korisnici' element={<Korisnici />} />
      </Routes>
     
    </Router>
  );
}