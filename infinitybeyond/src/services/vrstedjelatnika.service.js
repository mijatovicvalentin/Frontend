import http from "../http-common";


class vrstedjelatnikaDataService{

    async get(){
        return await http.get('/vrstedjelatnika');
    }

    async getBySifra(sifra) {
        return await http.get('/vrstadjelatnika' + sifra);
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


    async post(vrstadjelatnika){
        const odgovor = await http.post('/vrstadjelatnika',vrstadjelatnika)
           .then(response => {
             return {ok:true, poruka: 'Unio vrstudjelatnika'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
    }

    async put(sifra,vrstadjelatnika){
        const odgovor = await http.put('/vrstadjelatnika/' + sifra,vrstadjelatnika)
           .then(response => {
             return {ok:true, poruka: 'Promjenio vrstudjelatnika'}; 
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
         }

}

export default new vrstedjelatnikaDataService();