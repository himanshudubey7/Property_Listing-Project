const Property = require('../models/Property');

//create a property

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
//get all property

