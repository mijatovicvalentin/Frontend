import http from "../http-common";


class vrstedjelatnikaDataService{

    async get(){
        return await http.get('/vrsta_djelatnika');
    }

    async getByid(id) {
        return await http.get('/vrsta_djelatnika/' + id);
      }

    async delete(id){
        const odgovor = await http.delete('/vrsta_djelatnika/' + id)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(vrsta_djelatnika){
        //console.log(smjer);
        const odgovor = await http.post('/vrsta_djelatnika',vrsta_djelatnika)
           .then(response => {
             return {ok:true, poruka: 'Unio vrsta_djelatnika'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,vrsta_djelatnika){
        const odgovor = await http.put('/vrsta_djelatnika/' + sifra,vrsta_djelatnika)
           .then(response => {
             return {ok:true, poruka: 'Promjenio vrsta_djelatnika'}; // return u odgovor
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new vrstedjelatnikaDataService();