const Property = require('../models/Property');
const redisClient = require('../utils/redisClient'); // adjust the path if needed

exports.createProperty = async(req,res)=>{
    try{

        const property = new Property({...req.body, createdBy: req.user.id});
        await property.save();
        res.status(201).json(property);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};
//get all property list
exports.getProperty = async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) filter.city = new RegExp(req.query.city, 'i');
    if (req.query.type) filter.type = req.query.type;
    if (req.query.state) filter.state = req.query.state;
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.bedrooms) filter.bedrooms = Number(req.query.bedrooms);
    if (req.query.bathrooms) filter.bathrooms = Number(req.query.bathrooms);
    if (req.query.furnished) filter.furnished = req.query.furnished === 'true';
    if (req.query.isVerified) filter.isVerified = req.query.isVerified === 'true';
    if (req.query.minArea || req.query.maxArea) {
      filter.areaSqFt = {};
      if (req.query.minArea) filter.areaSqFt.$gte = Number(req.query.minArea);
      if (req.query.maxArea) filter.areaSqFt.$lte = Number(req.query.maxArea);
    }
    if (req.query.minRating) filter.rating = { $gte: Number(req.query.minRating) };
    if (req.query.tags) filter.tags = { $in: req.query.tags.split(',') };
    if (req.query.amenities) filter.amenities = { $in: req.query.amenities.split(',') };


    const cacheKey = `properties:${JSON.stringify(req.query)}`;

    const cachedProperties = await redisClient.get(cacheKey);
    if (cachedProperties) {
      console.log('⏪ Serving from Redis cache');
      return res.status(200).json(JSON.parse(cachedProperties));
    }

  
    const properties = await Property.find(filter);

  
    await redisClient.set(cacheKey, JSON.stringify(properties), { EX: 3600 });

    console.log('✅ Serving from MongoDB and caching result');
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get property by id

exports.getPropertyById = async(req, res)=>{
    try{
        const property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({message: 'Property not found!!!'});
        }
        res.json(property);
    }
    catch(err){
        res.status(500).json({error: err.message});

    }
};
exports.updateProperty = async(req,res)=>{
    try{
        const property = await Property.findById(req.params.id);
          if(!property){
            return res.status(404).json({message: 'Property not found!!!'});
        }

        if(property.createdBy.toString() != req.user.id){
            return res.status(404).json({message: 'Unautherozied!!'});
        }
        const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updated);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

};
// to delete
exports.deleteProperty = async(req,res)=>{
    try{
        const property = await Property.findById(req.params.id);
          if(!property){
            return res.status(404).json({message: 'Property not found!!!'});
        }

        if(property.createdBy.toString() != req.user.id){
            return res.status(404).json({message: 'Unautherozied!!'});
        }
        const updated = await Property.findByIdAndDelete(req.params.id);
       res.json({ message: 'Property deleted' });
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

};

//


