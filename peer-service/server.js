const express = require('express')
const cors = require('express')


const app = express()

app.use('/',(req,res)=>{
    console.log("peer service active!")
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Your app is running on PORT: ${PORT}`);
});