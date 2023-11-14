import mongoose from 'mongoose';

const Model = new mongoose.Schema({ 
        modelo:{
            type: String,
            required: true
        }, 
    },
    {
        timestamps: true
    });

export default mongoose.model('Model', Model)
