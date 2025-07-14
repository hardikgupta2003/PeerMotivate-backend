const express = require('express');
const cors = require('cors')

require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const fcmTokenRoutes = require('./routes/fcmTokenRoutes')
const verifyFirebaseToken = require('./middlewares/firebaseAuth')

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", verifyFirebaseToken,userRoutes);
app.use("/api", verifyFirebaseToken,fcmTokenRoutes);
app.use('/hello',(req,res)=>{
    console.log("hello testing here")
    return
});

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Your app is running on PORT: ${PORT}`)
})
