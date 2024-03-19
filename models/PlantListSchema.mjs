import mongoose from "mongoose";

const plantListSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true
    },
    plant_name: String,
    plant_type: String,
    description: String
})

// Set up indexes
plantListSchema.index({ user_id: 1 }, { unqiue: true })
plantListSchema.index({ plant_name: 1 }, { unqiue: true })


// Create a model based on the schema
export default mongoose.model('Plants', plantListSchema);
