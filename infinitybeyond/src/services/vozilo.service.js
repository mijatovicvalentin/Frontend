import http from "../http-common";

class VoziloDataService {
  get() {
    return http.get("/vozilo");
  }

  async getBySifra(sifra) {
   // console.log(sifra);
    return await http.get('/vozilo/' + sifra);
  }

  async getPolaznici(sifra) {
    // console.log(sifra);
     return await http.get('/vozilo/' + sifra + '/djelatnik');
   }
 


  async post(vozilo){
    //console.log(smjer);
    const odgovor = await http.post('/vozilo',vozilo)
       .then(response => {
         return {ok:true, poruka: 'Unio vozilo'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
}


  async delete(sifra){
    
    const odgovor = await http.delete('/vozilo/' + sifra)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     async obrisiVozilo(vozilo, djelatnik){
    
      const odgovor = await http.delete('/djelatnik/obrisivrstadjelatnika/' + vozilo + '/' + djelatnik)
         .then(response => {
           return {ok:true, poruka: 'Obrisao uspješno'};
         })
         .catch(error => {
           console.log(error);
           return {ok:false, poruka: error.response.data};
         });
   
         return odgovor;
       }

       async DodajVozilo(vozila, djelatnik){
    
        const odgovor = await http.post('/djelatnik/dodajvrstadjelatnika/' + vozila + '/' + djelatnik)
           .then(response => {
             return {ok:true, poruka: 'Dodao uspješno'};
           })
           .catch(error => {
             console.log(error);
             return {ok:false, poruka: error.response.data};
           });
     
           return odgovor;
         }

}

export default new VoziloDataService();