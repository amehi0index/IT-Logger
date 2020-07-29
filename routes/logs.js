const express = require('express')
const router = express.Router()

const Log = require('../models/Log')

// @desc    Get all logs
// @route   GET /api/logs
// @access  Public
router.get('/', async (req, res) => { 
    try {
      const logs = await Log.find()
      res.json(logs)
    } catch (err) {
      return res.status(500).json({
        error: 'Server Error'
      });
    }
  })

//@desc     Add a new log
//@route    POST api/logs
//@access   Public
router.post('/', async (req, res) => {

    const { message, attention, tech} = req.body

    try {

        //Create new tech
        const newLog = new Log({
            message,  
            attention,
            tech
        })

        const log = await newLog.save()
        res.json(log)
        } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route     PUT api/logs/:id
// @desc      Update log
// @access    Public
router.put('/:id',async (req, res) => {
  //const {message, attention, tech} = req.body

  // Build log object
  const logFields = {
    message: req.body.message,
    attention: req.body.attention,
    tech: req.body.tech
  }

    try {
    let log = await Log.findById(req.params.id)
    if (!log) return res.status(404).json({msg: 'Log not found'})


    log = await Log.findByIdAndUpdate(
       req.params.id,
      {$set: logFields},
      {new: true},
    );

    res.json(log)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
});

//@route    DELETE api/logs/:id
//@desc     Delete a log
//@access   Public
router.delete('/:id', async(req, res) => {
    try {
        let log = await Log.findById(req.params.id)
    
        await Log.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Log Successfully Deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router;