import "./App.css";
import axios from "axios";
import React from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";
import QRCode from "react-qr-code";

import data from './data/sample'

let adaPay = data.adaPay
let token = process.env.REACT_APP_COTI_KEY;
let requestPaymentUrl = process.env.REACT_APP_REQUEST_PAYMENT_URL;
let getOrderPaymentUrl = process.env.REACT_APP_GET_PAYMENT_URL;

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacing(0),
  },
  selectEmpty: {
    marginRight: theme.spacing(2),
    minWidth: 120,
    marginBottom: theme.spacing(2),
  },
}));

const selectedRows = [];
const value = 0;
const sellerPayInfo = {
  address: null,
  amount: 0,
};

const initState = {
  rows: data.rows,
  selectedRows: selectedRows,
  value: value,
  sellerPayInfo: sellerPayInfo,
};


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



//ok already

const onClick = (value) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const data = {...adaPay, amount: value * 1000000};
  
  axios.put( 
  'https://api-sandbox.adapay.finance/payment-request',
  data,
  config
  ).then((a) => console.log(a))
  .catch((e) => console.log(e));
};


 */



let countValue = (items, selectedItems) => {
  let itemValue = [];
  selectedItems.forEach((item) => {
    itemValue.push(items[item].price * items[item].quantity);
  });
  return itemValue.reduce((p, c) => p + c, 0);
};

function App() {
  const classes = useStyles();

  const [state, setState] = React.useState(initState);

  const getReceiveAddress = (requestID) => {
    console.log(requestID.data);

    axios({
      url: getOrderPaymentUrl,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: requestID.data,
    })
      .then((data) => {
        console.log(data);
        setState({
          ...state,
          sellerPayInfo: {
            address: data.data.address,
            amount: data.data.amount,
          },
        });
      })
      .catch((err) => console.error(err));
  };

  const onClick = (value) => {
    const data = { ...adaPay, amount: value * 1000000 };
    console.log(data);

    axios({
      url: requestPaymentUrl,
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      data: data,
    })
      .then((data) => getReceiveAddress(data))
      .catch((err) => console.error(err));
  };

  let onCellEditCommit = (params, event) => {
    let newState = { ...state };
    let newRows = [...state.rows];
    let newRow = newState.rows[params.id];
    newRow.quantity = params.value;

    newRows.splice(params.id, 1, newRow);
    let value = countValue(state.rows, state.selectedRows);

    setState({ ...state, rows: newRows, value: value });
  };

  let onSelectionModelChange = (model) => {
    let value = countValue(state.rows, model);
    setState({ ...state, selectedRows: model, value: value });
  };

  return (
    <div style={{ padding: 10 }}>
      <Typography
        variant="h6"
        gutterBottom
        style={{ textDecoration: "underline", marginBottom: 20 }}
      >
        Pay through AdaPay demo
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={state.rows}
              columns={data.columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onSelectionModelChange}
              onCellEditCommit={onCellEditCommit}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ textDecoration: "underline", color: "orange" }}
          >
            Pay your order by Ada
          </Typography>

          <QRCode value={JSON.stringify(adaPay)} size={140} />
          <br />

          <Typography
            variant="body2"
            gutterBottom
            style={{ fontStyle: "italic", color: "green" }}
          >
            Order value: {state.value} (Ada)
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.selectEmpty}
            onClick={() => onClick(state.value)}
          >
            Pay with COTI
          </Button>
        </Grid>
      </Grid>
      <Typography
        variant="subtitle2"
        gutterBottom
        style={{ textDecoration: "underline", color: "orange" }}
      >
        Payment information
      </Typography>
      <Typography variant="body2" gutterBottom>
        Address: {state.sellerPayInfo.address}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Amount (Lovelace): {state.sellerPayInfo.amount}
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textDecoration: "underline" }}
      >
        App logging ....
      </Typography>
      <div>{JSON.stringify(state.sellerPayInfo)}</div>
      <div>{JSON.stringify(state)}</div>
      <div>{JSON.stringify({ ...adaPay, amount: state.value })}</div>
     
    </div>
  );
}


export default App;
