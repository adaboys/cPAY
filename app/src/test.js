import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


let token = "DjqEItyPUbY5bizUqQY0HTqCW6gR1CCue6nhLrS8CoDGjg4MRQ";
/* 
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
 key: "value"
};

Axios.post( 
'http://localhost:8000/api/v1/get_token_payloads',
bodyParameters,
config
).then(console.log).catch(console.log);



const onClick = (value) => {
  const data = {...adaPay, amount: value};
  console.log(data)

   axios({
    url: "https://api-sandbox.adapay.finance/payment-request",
    method: "PUT",
  //  headers: { Authorization: `Bearer ${token}` },
    data: data,
  }).then(data => console.log(data)); 
};
 */




const onClick = (value) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const data = {...adaPay, amount: value};
  
  axios.put( 
  'https://api-sandbox.adapay.finance/payment-request',
  data,
  config
  ).then((a) => console.log)
  .catch((e) => console.log(e));
};

