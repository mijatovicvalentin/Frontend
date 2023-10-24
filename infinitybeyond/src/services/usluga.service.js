import http from "../http-common";


class UslugaDataService{

    async get(){
        return await http.get('/usluga');
    }

    async getBySifra(sifra) {
        return await http.get('/usluga/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/usluga/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(Usluga){
        //console.log(smjer);
        const odgovor = await http.post('/usluga',Usluga)
           .then(response => {
             return {ok:true, poruka: 'Unio usluga'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,usluga){
        const odgovor = await http.put('/usluga/' + sifra,usluga)
           .then(response => {
             return {ok:true, poruka: 'Promjenio usluga'}; // return u odgovor
           })
           .catch(error => {
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new UslugaDataService();