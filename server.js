const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//test route
app.get('/', (req, res)=>{
    res.send('Backend is running !!');
})
const PORT = process.env.PORT;
//conncting mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('mongoDB connected succesfully!!');
    app.listen(PORT, ()=>{
        console.log(`Server running on PORT ${PORT}`);
    })
})
.catch((err)=>{
    console.error(` error in connecting the mongoDB: ${err}` );
})