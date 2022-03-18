import { v4 as uuidv4 } from "uuid";

let  data = {
  columns: [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price (Ada)",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 110,
      editable: true,
    },
  ],
  
  rows: [
    { id: 0, price: 50, product: "T Shirt", quantity: 1 },
    { id: 1, price: 50, product: "Sky Jean", quantity: 1 },
    { id: 2, price: 36, product: "Chino Short", quantity: 1 },
    { id: 3, price: 41, product: "Smart Pants", quantity: 1 },
    { id: 4, price: 60, product: "HEATTECH Cotton", quantity: 1 },
    { id: 5, price: 78, product: "Easy Short", quantity: 1 },
    { id: 6, price: 60, product: "Waffle", quantity: 1 },
    { id: 7, price: 55, product: "Browline", quantity: 1 },
    { id: 8, price: 90, product: "Bucket", quantity: 1 },
    { id: 9, price: 300, product: "BLOCKTECH", quantity: 1 },
  ],

  adaPay: {
    amount: 0,
    paymentRequestExpirationTime: 100,
    description: "cPay demo",
    receiptEmail: "bitmaster.sg@gmail.com",
    name: "my cPay order",
    orderId: uuidv4(),
    returnUrl: "http://abc.com",
    addressForRefund:
      "addr_test1qq0rug5wxyd2fnwdyvlc5vc6jk8tq59nwjn7xx5gdwdj9p43ge73vmf7xvkn23tkyq30gd2jtlgztf3rw0mtvkjzv4vqr6wnz3",
  }

}

export default data;