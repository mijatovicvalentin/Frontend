import http from '../http-common';

class KorisnikDataService {
  async get() {
    return await http.get('/korisnik');
  }

  async getByid(id) {
    return await http.get('/korisnik/' + id);
  }

  async post(korisnik){
    //console.log(kazeta);
    const odgovor = await http.post('/korisnik',korisnik)
       .then(response => {
         return {ok:true, poruka: 'Unio korisnik'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

  async put(id,korisnik){
    const odgovor = await http.put('/korisnik/' + id,korisnik)
       .then(response => {
         return {ok:true, poruka: 'Promjenio korisnik'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(id){
    
    const odgovor = await http.delete('/korisnik/' + id)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }
     
 
}

export default new KorisnikDataService();
