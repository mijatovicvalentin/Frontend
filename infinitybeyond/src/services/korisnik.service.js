import http from "../http-common";


class KorisnikDataService{

    async get(){
        return await http.get('/Korisnik');
    }

    async getBySifra(sifra) {
        return await http.get('/korisnik/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Korisnik/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(Korisnik){
        //console.log(smjer);
        const odgovor = await http.post('/korisnik',Korisnik)
           .then(response => {
             return {ok:true, poruka: 'Unio korisnika'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,korisnik){
        //console.log(smjer);
        const odgovor = await http.put('/korisnik/' + sifra,korisnik)
           .then(response => {
             return {ok:true, poruka: 'Promjenio korisnika'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new KorisnikDataService();