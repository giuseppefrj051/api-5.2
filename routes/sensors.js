const express = require('express');
const router = express.Router();
const Sensors = require('../models/sensors');

//get all
router.get('/', async (req, res) => {
    try{
        const sensors = await Sensors.find();
        res.json(sensors);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    //http://localhost:3000/sensors
    //res.send('this is the router Get all')
});


//get one
router.get('/:id', getSensors, (req, res) => {
    res.json(res.sensors);
    var dataValue = res.sensors.value
    var nameDb = res.sensors.name
    var dataId = req.params.id

    if(dataValue > 8){
      console.log('High alarm, the pressure is ' , dataValue , 'for the ID= ', dataId , ' Named= ', nameDb)
    } else {
      console.log('The device ', nameDb, 'has been reached ID= ', dataId)
    }
    //console.log(dataValue); //this is getting just one bit o the object
  
});

//update througt GET method

//http://localhost:3000/sensors/62d71c6f6b02ab26fdca3ed7/4.2
//http://localhost:3000/sensors/62d71cdebe9c928878fec826/56.6

router.get('/:id/:value', getSensors, async (req, res) => {
  var dataValue = Number(req.params.value)
  var dataId = req.params.id
  
  if (req.body.name != null) {
    res.sensors.name = req.body.name 
  }
  if (req.body.location != null) {
    res.sensors.location = req.body.location
  }
  if (dataValue != null) {
    res.sensors.value = dataValue
  }
  if (req.body.unit != null) {
    res.sensors.unit = req.body.unit
  }

  try {
    const updatedSensor = await res.sensors.save()
    res.json(updatedSensor);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

});


//create one
router.post('/', async (req, res) => {
    const sensors = new Sensors({
        name: req.body.name,
        location: req.body.location,
        value: req.body.value,
        unit: req.body.unit,
        status: req.body.status,
        highAlarm: req.body.highAlarm,
        lowAlarm: req.body.lowAlarm
    })
    try{
        const newSensor = await sensors.save();
        res.status(201).json(newSensor);
        console.log(newSensor);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});



// Updating One
router.patch('/:id', getSensors, async (req, res) => {
  if (req.body.name != null) {
    res.sensors.name = req.body.name 
  }
  if (req.body.location != null) {
    res.sensors.location = req.body.location
  }
  if (req.body.value != null) {
    res.sensors.value = req.body.value
  }
  if (req.body.unit != null) {
    res.sensors.unit = req.body.unit
  }
  if (req.body.status != null) {
    res.sensors.status = req.body.status
  }
  if (req.body.highAlarm != null) {
    res.sensors.highAlarm = req.body.highAlarm
  }
  if (req.body.lowAlarm != null) {
    res.sensors.lowAlarm = req.body.lowAlarm
  }
  try {
    const updatedSensor = await res.sensors.save()
    res.json(updatedSensor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSensors, async (req, res) => {
  try {
    await res.sensors.remove()
    res.json({ message: 'Device Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})





async function getSensors(req, res, next) {
    let sensors
    try {
      sensors = await Sensors.findById(req.params.id)
      if (sensors == null) {
        return res.status(404).json({ message: 'Cannot find this ID' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.sensors = sensors
    next()
  }


module.exports = router