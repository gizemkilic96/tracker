import axios from "axios";

const BACKEND_URL='https://tracker-4868d-default-rtdb.firebaseio.com'

export async function storeGider(giderData){

    const response = await axios.post(BACKEND_URL + '/giderler.json', giderData );
    const id = response.data.name;
      return id;
}

export  async function fetchGiderler(){
  const response  = await  axios.get(BACKEND_URL + '/giderler.json',);

   const giderler= [];
   console.log(response.data);
   for(const key in response.data){
       const giderlerObj ={
           id: key,
           amount: response.data[key].amount,
           date: new Date(response.data[key].date) ,
           description:response.data[key].description

       };
       giderler.push(giderlerObj);
   }
   return giderler;
}

 
// export function updateGider(id, giderData) {
//     return axios.put(BACKEND_URL + `/giderler/${id}.json`, giderData);
//   }

  export function updateGider(id, giderData) {
    return axios.put(BACKEND_URL + `/giderler/${id}.json`, giderData);
  }

// export  function deleteGider(id){
//     return axios.put(BACKEND_URL+ '/giderler/${id}.json');
// };
export function deleteGider(id) {
    return axios.delete(BACKEND_URL + `/giderler/${id}.json`);
  }