



const getAlldata=(products)=> fetch('http://127.0.0.1:3030/api/'+products, {
  method: 'GET'
  // mode: 'no-cors'
  //dataType: 'json'
})
  .catch(err => {
    console.log(err)
  })



  export { 
    getAlldata,

  }