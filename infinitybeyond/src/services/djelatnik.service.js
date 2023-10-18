import http from "../http-common";

class DjelatnikDataService {
  get() {
    return http.get("/djelatnik");
  }

  async getBySifra(sifra) {
   // console.log(sifra);
    return await http.get('/djelatnik/' + sifra);
  }

  async getPolaznici(sifra) {
    // console.log(sifra);
     return await http.get('/djelatnik/' + sifra + '/vrstadjelatnika');
   }
 


  async post(djelatnik){
    //console.log(smjer);
    const odgovor = await http.post('/djelatnik',djelatnik)
       .then(response => {
         return {ok:true, poruka: 'Unio djelatnik'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
}


  async delete(sifra){
    
    const odgovor = await http.delete('/djelatnik/' + sifra)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     async obrisiDjelatnika(djelatnik, vrstadjelatnika){
    
      const odgovor = await http.delete('/djelatnik/obrisivrstadjelatnika/' + djelatnik + '/' + vrstadjelatnika)
         .then(response => {
           return {ok:true, poruka: 'Obrisao uspješno'};
         })
         .catch(error => {
           console.log(error);
           return {ok:false, poruka: error.response.data};
         });
   
         return odgovor;
       }

       async dodajDjelatnika(djelatnik, vrstadjelatnika){
    
        const odgovor = await http.post('/djelatnik/dodajvrstadjelatnika/' + djelatnik + '/' + vrstadjelatnika)
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

export default new DjelatnikDataService();