import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import izbornik from './components/izbornik.component';
import pocetna from './components/pocetna.component';
import nadzornaploca from './components/nadzornaploca.component';
import korisnici from './components/Korisnici/korisnici.components';

export default function App() {
  return (
    <Router>
      <izbornik />
      <Routes>
        <Route path='/' element={<pocetna />} />
        <Route path='/nadzornaploca' element={<nadzornaploca />} />
        <Route path='/Korisnici' element={<korisnici />} />
      </Routes>
     
    </Router>
  );
}