const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(()=>{
    console.log('MongoDb connected successfully!!');
    CsvImport()
})
.catch((err)=>{
    console.error({error: err.message});
});

function CsvImport(){
    const results= [];
    fs.createReadStream('./data/property.csv')
    .pipe(csv())
    .on('data',(data)=>{
        results.push({

        title: data.title,
        type: data.type,
        price: parseFloat(data.price),
        state: data.state,
        city: data.city,
        areaSqFt: parseFloat(data.areaSqFt),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        amenities: data.amenities?.split(',').map(a => a.trim()),
        furnished: data.furnished === 'true',
        availableFrom: new Date(data.availableFrom),
        listedBy: data.listedBy,
        tags: data.tags?.split(',').map(t => t.trim()),
        colorTheme: data.colorTheme,
        rating: parseFloat(data.rating),
        isVerified: data.isVerified === 'true',
        listingType: data.listingType,
        createdBy: process.env.DUMMY_USER_ID
        });
    })
   .on('end', async () => {
      try {
        await Property.insertMany(results);
        console.log('✅ Data imported successfully!');
        mongoose.connection.close();
      } catch (error) {
        console.error('❌ Import failed:', error);
      }
    });
}