import express from 'express'
const router = express.Router()

import PlantList from '../models/favListSchema.mjs'

// @route   GET /api/favorites
// @desc    Read all plants
// @access  Public
router.get('/api/favorites', async (req, res) => {
    try {
        const allPlants = await PlantList.find({})
        res.send(allPlants)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' })
    }
})

// @route   POST /api/favorites
// @desc    Create a new plant
// @access  Public
// @param   {Object} req.body - The plant data to be created
/**
 * @example
 * Request URL: http://localhost:3000/api/favorites
 * Request Body:
 * {
 *   "plant_scientific_name": "plant3",
 *   "plant_common_name": "plant3_common_name",
 *   "plant_family": "plant3_family",
 *   "plant_genus": "plant3_genus",
 *   "notes": "I want this plant"
 * }
 */

router.post('/api/favorites', async (req, res) => {
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

// @route   PUT /api/favorites/:id
// @desc    Update a plant by ID
// @access  Public
// @param   {string} :id - The ID of the plant to be updated
/**
 * @example
 * Request URL: http://localhost:3000/api/favorites/:id
 */

router.put('/api/favorites/:id', async (req, res) => {
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


// @route   DELETE /api/favorites/:id
// @desc    DELETE a plant by ID
// @access  Public
// @param   {string} :id - The ID of the plant to be updated
/**
 * @example
 * Request URL: http://localhost:3000/api/favorites/:id
 */
router.delete('/api/favorites/:id', async (req, res) => {
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
