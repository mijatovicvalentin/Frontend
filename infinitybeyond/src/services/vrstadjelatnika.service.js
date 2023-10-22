import http from "../http-common";


class vrstedjelatnikaDataService{

    async get(){
        return await http.get('/vrstadjelatnika');
    }

    async getBySifra(sifra) {
        return await http.get('/vrstadjelatnika/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/vrstadjelatnika/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(vrsta_djelatnika){
        const odgovor = await http.post('/vrstadjelatnika',vrsta_djelatnika)
           .then(response => {
             return {ok:true, poruka: 'Unio vrstadjelatnika'}; 
           })
           .catch(error => {
           
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
    }

    async put(sifra,vrstadjelatnika){
        const odgovor = await http.put('/vrstadjelatnika/' + sifra,vrstadjelatnika)
           .then(response => {
             return {ok:true, poruka: 'Promjenio vrstadjelatnika'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
         }

}

export default new vrstedjelatnikaDataService();