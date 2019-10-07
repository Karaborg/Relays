var express = require('express');
var router = express.Router();

var gpio = require('rpi-gpio');

gpio.setup(32, gpio.DIR_OUT);
gpio.setup(36, gpio.DIR_OUT);
gpio.setup(38, gpio.DIR_OUT);
gpio.setup(40, gpio.DIR_OUT);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  console.log("Alive")
  close(32)
  close(36)
  close(38)
  close(40)
});

router.post('/btn1',function (req, res) {
  var data = req.body;
  console.log(data)
  if(data.state === "true"){
    whichOneToOpen(data.switchName)
  }else if (data.state === "false") {
    whichOneToClose(data.switchName)
  }
});

function whichOneToOpen(name) {
  if (name == "lamp"){
    open(32);
  } else if (name == "tv"){
    open(36);
  } else if (name == "amfi") {
    open(38);
  } else if (name == "speaker") {
    open(40);
  }
}

function whichOneToClose(name) {
  if (name == "lamp"){
    close(32);
  } else if (name == "tv"){
    close(36);
  } else if (name == "amfi") {
    close(38);
  } else if (name == "speaker") {
    close(40);
  }
}

function close(i){
  gpio.write(i, true, function(err) {
    if (err) throw err;
  });
}

function open(i){
  gpio.write(i, false, function(err) {
    if (err) throw err;
  });
}

module.exports = router;