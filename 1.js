const axios = require('axios');

axios.get('http://localhost:5000/api/grades')
  .then(response => {
    console.log(response.data);
    console.log("axios.get \n\n======================================================")
  })
  .catch(error => {
    console.log("================================\n\naxios error 1.js\n\n================================")
    console.log(error);
    console.log("errors do be happening 1.js error\n\n")
  });