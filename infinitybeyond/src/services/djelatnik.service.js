import http from "../http-common";

class DjelatnikDataService {
  get() {
    return http.get("/djelatnik");
  }

  async getByid(id) {
    return await http.get('/djelatnik/' + id);
  }

  async getvrsta_djelatnika(id) {
     return await http.get('/djelatnik/' + id + '/vrstadjelatnika');
   }
 


  async post(djelatnik){
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


  async delete(id){
    
    const odgovor = await http.delete('/djelatnik/' + id)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     async obrisivrsta_djelatnika(djelatnik, vrstadjelatnika){
    
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

       async dodajvrsta_djelatnika(djelatnik, vrstadjelatnika){
    
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