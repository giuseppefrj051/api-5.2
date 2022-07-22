//https://api-5-2.herokuapp.com/sensors
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'local.engineer.uk@outlook.com',
    pass: 'Glhj18770'
  }
});

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Sensors = require('./models/sensors');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db =  mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));



app.use(express.json());

const sensorsRouter = require('./routes/sensors');


 
const port = process.env.PORT || 3000;
var server = app.listen(port, listening);
app.use('/sensors', sensorsRouter);
app.use(express.static('web'));

function listening() {
    console.log(`listening at port ${port} ...`);
}

//const port = process.env.PORT || 3000;
//app.listen(port, () => console.log('server listening on port ', port));


autoRun();

function autoRun() {
    setInterval(callAllAutoFunc, 30000);
  };
  
  



function callAllAutoFunc() {
  getFirst();
  get2nd();
}




async function getFirst(){
  try{
    const sensors = await Sensors.findById('62d71c6f6b02ab26fdca3ed7');
    var dataValue = sensors.value;
    var dataName = sensors.name;
    var dataUnit = sensors.unit;
    var dataHighAlarm = sensors.highAlarm;
    var dataLowAlarm = sensors.lowAlarm;
    
    if(dataValue > dataHighAlarm){
      console.log('High Alarm', dataValue,dataUnit , 'on', dataName)
    }
    if(dataValue < dataLowAlarm){
      console.log('low Alarm', dataValue,dataUnit , 'on', dataName)
    }
  } catch (err) {
      console.log(500).json({message: err.message})
  }
  
};

async function get2nd(){
  try{
    const sensors = await Sensors.findById('62d71cdebe9c928878fec826');
    var dataValue = sensors.value;
    var dataName = sensors.name;
    var dataUnit = sensors.unit;
    var dataHighAlarm = sensors.highAlarm;
    var dataLowAlarm = sensors.lowAlarm;
    
    if(dataValue > dataHighAlarm){
      var varMessage = 'The Boiler is running at ';
      console.log(varMessage, dataValue,dataUnit , 'on the reader', dataName);
      var mailOptions = {
        from: 'local.engineer.uk@outlook.com',
        to: 'giuseppefrj051@gmail.com',
        subject: 'BMS Notification',
        text: varMessage + dataValue + '' + dataUnit + ' on the reader ' +dataName
      };
      emailAlarm(mailOptions);
    }
    if(dataValue < dataLowAlarm){
      var varMessage = 'Boiler temp low running at ';
      console.log(varMessage, dataValue,dataUnit , 'on the reader', dataName);
      var mailOptions = {
        from: 'local.engineer.uk@outlook.com',
        to: 'giuseppefrj051@gmail.com',
        subject: 'BMS Notification',
        text: varMessage + dataValue + '' + dataUnit + ' on the reader ' +dataName
      };
      emailAlarm(mailOptions);
    }
  } catch (err) {
      console.log(500).json({message: err.message})
  }
};





function emailAlarm(mailOptions){
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};




