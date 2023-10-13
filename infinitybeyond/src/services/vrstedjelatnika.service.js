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
        //console.log(smjer);
        const odgovor = await http.post('/vrstadjelatnika',vrstadjelatnika)
           .then(response => {
             return {ok:true, poruka: 'Unio vrstudjelatnika'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,vrstadjelatnika){
        const odgovor = await http.put('/vrstadjelatnika/' + sifra,vrstadjelatnika)
           .then(response => {
             return {ok:true, poruka: 'Promjenio vrstudjelatnika'}; // return u odgovor
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; 
           });
     
           return odgovor;
         }

}

export default new vrstedjelatnikaDataService();