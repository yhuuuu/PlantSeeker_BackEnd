import express from 'express'
const router = express.Router()

import PlantList from '../models/plantListSchema.mjs'

//Define routes for plant list collection

//Read all plants
router.get('/plants', async (req, res) => {
    try {
        const allPlants = await PlantList.find({})
        res.send(allPlants)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' })
    }
})

//Create a plant
/**
 { 
    "plant_name": "Monstera Deliciosa",
      "plant_type": "Houseplant",  
      "description": "This Monstera Deliciosa was purchased from a local nursery. It has large, glossy leaves with fenestrations. It's been thriving in bright, indirect light in my living room."
 }
 */
router.post('/plants', async (req, res) => {
    try {
        let newPlants = new PlantList(req.body);
        //Save the user to the database
        await newPlants.save();
        //Send a success response
        res.status(201).json({
            success: true,
            message: 'Plant created successfully',
            plant: newPlants
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' })
    }
})

//Update plant
/* 
   ex: http://localhost:3000/plants/:id
   {
    "plant_name": "Here is new Plant",
      "plant_type": "Houseplant",  
      "description": "This Monstera Deliciosa was purchased from a local nursery. It has large, glossy leaves with fenestrations. It's been thriving in bright, indirect light in my living room."
 }
**/
router.put('/plants/:id', async (req, res) => {
    try {
        const plant = await PlantList.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ msg: 'User Not Found' })
        }

        let updatePlant = await PlantList.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatePlant)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ mes: 'Server Error' })

    }
})

//Delete plant
/**
 * ex:http://localhost:3000/plants/:id
 */
router.delete('/plants/:id', async (req, res) => {
    try {
        const plant = await PlantList.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ msg: 'Plant Not Found' })
        }

        await PlantList.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: `Plant deleted` })
    }

    catch (err) {
        console.log(object);
        res.status(500).json({ msg: 'Server Error' })

    }
})

export default router
