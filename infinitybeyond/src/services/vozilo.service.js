import http from "../http-common";

class VoziloDataService {
  get() {
    return http.get("/vozilo");
  }

  async getByid(id) {
    return await http.get('/vozilo/' + id);
  }

  async getdjelatnik(id) {
     return await http.get('/vozilo/' + id + '/djelatnik');
   }
 


  async post(vozilo){
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


  async delete(id){
    
    const odgovor = await http.delete('/vozilo/' + id)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     async obrisidjelatnik(vozilo, djelatnik){
    
      const odgovor = await http.delete('/vozilo/djelatnik/' + vozilo + '/' + djelatnik)
         .then(response => {
           return {ok:true, poruka: 'Obrisao uspješno'};
         })
         .catch(error => {
           console.log(error);
           return {ok:false, poruka: error.response.data};
         });
   
         return odgovor;
       }

       async obrisidjelatnik(vozilo, djelatnik){
    
        const odgovor = await http.post('/vozilo/djelatnik/' + vozilo + '/' + djelatnik)
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