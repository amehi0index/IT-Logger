const express = require('express')
const connectDB = require('./config/db')

//Initialize app
const app = express()

//Connect DB
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))     

//Route Middleware
app.use('/api/techs', require('./routes/techs'))
app.use('/api/logs', require('./routes/logs'))

//ROUTE FOR HOME
app.get('/', (req, res) =>{  
    res.send("We are on home ('/')!"); 
});


//Listen to server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))