const express = require('express')
const router = express.Router()

const Tech = require('../models/Tech')

// @desc    Get all technicians
// @route   GET /api/techs
// @access  Public
router.get('/', async (req, res) => { 
    try {
      const techs = await Tech.find();
      res.json(techs)
    } catch (err) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  })

//@desc     Add a new tech
//@route    POST api/techs
//@access   Public
router.post('/', async (req, res) => {

    const { firstName, lastName } = req.body

    try {

        //Create new tech
        const newTech = new Tech({
            firstName,  
            lastName  
        })

        const tech = await newTech.save()
        res.json(tech)
        } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route    DELETE api/techs/:id
//@desc     Delete a tech
//@access   Public
router.delete('/:id', async(req, res) => {
    try {
        let tech = await Tech.findById(req.params.id)
    
        await Tech.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Tech Successfully Deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router;

  