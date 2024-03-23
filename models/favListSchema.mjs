import mongoose from "mongoose";

const favListSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true
    },
    plant_id: String,
    plant_scientific_name: String,
    plant_common_name: String,
    plant_family: String,
    plant_genus: String,
    description: String,
})

//Set up indexes
favListSchema.index({ user_id: 1 }, { unqiue: true })
favListSchema.index({ plant_name: 1 }, { unqiue: true })


// Create a model based on the schema
export default mongoose.model('PlantList', favListSchema);
