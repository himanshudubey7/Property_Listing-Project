const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PropertyRoutes = require('./routes/PropertyRoutes')
const favoriteRoutes = require('./routes/favoriteRoutes');

dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/properties',PropertyRoutes);
app.use('/api/favorites', favoriteRoutes);

//test route
app.get('/', (req, res)=>{
    res.send('Backend is running !!');
});
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