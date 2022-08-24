require('dotenv').config();
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const Sensors = require('./models/sensors');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  } 
});

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db =  mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


app.use(express.urlencoded({ extended: false})); // this is for read post data

app.use(express.json());

const sensorsRouter = require('./routes/sensors');

 
 
const port = process.env.PORT || 3000;
var server = app.listen(port, listening);
app.use('/sensors', sensorsRouter);
app.use(express.static('web'));

function listening() {
    console.log(`listening at port ${port} ...`);
}

const esp32_0001 = '62db51a4ea4135734b210883';
const esp8266_0001 = '62db51e8ea4135734b210886';
//alarm script every 5 mins
function autoRun() {
    setInterval(callAllAutoFunc, 300000);
  };
function callAllAutoFunc() {
  FistAlarm();
  SecondAlarm();
}
autoRun();

async function FistAlarm(){
  try{
    const sensors = await Sensors.findById(esp32_0001);
    var dataValue = sensors.value;
    var dataName = sensors.name;
    var dataUnit = sensors.unit;
    var dataHighAlarm = sensors.highAlarm;
    var dataLowAlarm = sensors.lowAlarm;
    var dataAlarmAct = sensors.alarmAct;
    var dataLocation = sensors.location;
    
    //High Alarm
    if(dataValue > dataHighAlarm && dataAlarmAct == true){
      var varMessage = 'High Pressure Alarm has been reach at  ';
      var mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        subject: 'BMS Notification From ' + dataLocation,
        text: varMessage + dataLocation + ' on the device ' + dataName + ' ' + dataValue + ' ' + dataUnit
      };
      emailAlarm(mailOptions);
    }

    //Low Alarm
    if(dataValue < dataLowAlarm && dataAlarmAct == true){
      var varMessage = 'Low Pressure Alarm has been reach at  ';
      var mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        subject: 'BMS Notification From ' + dataLocation,
        text: varMessage + dataLocation + ' on the device ' + dataName + ' ' + dataValue + ' ' + dataUnit
      };
      emailAlarm(mailOptions);
    }
  } catch (err) {
      console.log(500).json({message: err.message})
  }
}; 

async function SecondAlarm(){
  try{
    const sensors = await Sensors.findById(esp8266_0001);
    var dataValue = sensors.value;
    var dataName = sensors.name;
    var dataUnit = sensors.unit;
    var dataHighAlarm = sensors.highAlarm;
    var dataLowAlarm = sensors.lowAlarm;
    var dataAlarmAct = sensors.alarmAct;
    var dataLocation = sensors.location;
    
    //High Alarm
    if(dataValue > dataHighAlarm && dataAlarmAct == true){
      var varMessage = 'High Temp Alarm has been reach at  ';
      var mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        subject: 'BMS Notification From ' + dataLocation,
        text: varMessage + dataLocation + ' on the device ' + dataName + ' ' + dataValue + ' ' + dataUnit
      };
      emailAlarm(mailOptions);
    }

    //Low Alarm
    if(dataValue < dataLowAlarm && dataAlarmAct == true){
      var varMessage = 'Low Temp Alarm has been reach at  ';
      var mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        subject: 'BMS Notification From ' + dataLocation,
        text: varMessage + dataLocation + ' on the device ' + dataName + ' ' + dataValue + ' ' + dataUnit
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




