import http from "../http-common";


class UslugaDataService{

    async get(){
        return await http.get('/Usluga');
    }

    async getBySifra(id) {
        return await http.get('/usluga/' + id);
      }

    async delete(id){
        const odgovor = await http.delete('/Usluga/' + id)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(usluga){
        //console.log(smjer);
        const odgovor = await http.post('/usluga',usluga)
           .then(response => {
             return {ok:true, poruka: 'Unio usluga'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(id,usluga){
        //console.log(smjer);
        const odgovor = await http.put('/usluga/' + id,usluga)
           .then(response => {
             return {ok:true, poruka: 'Promjenio usluga'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new UslugaDataService();