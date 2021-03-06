"use strict";

var routeName = "digitalWrite";
module.exports = {
  name: "Digital Write",
  routeName: routeName,
  init: function init(arduino, io, pin) {
    return new digitalWrite(arduino, pin);
  },
  route: function route(data, fn, io, pins) {
    var pin = parseInt(data);
    pins[pin].toggle();
    io.sockets.emit(routeName + ':change', {
      pin: pin,
      status: pins[pin].getStatus()
    });
  }
};

// update: function(){}
var digitalWrite = function digitalWrite(arduino, pin) {
  this.pin = pin;
  this.status = 0;
  this.writePin = new arduino.Pin(this.pin);

  this.on = function () {
    this.writePin.write(1);
    this.status = 1;
  };
  this.off = function () {
    this.writePin.write(0);
    this.status = 0;
  };
  this.toggle = function () {
    this.status = this.status * -1 + 1;
    this.writePin.write(this.status);
  };
  this.getStatus = function () {
    console.log(this.pin + " " + this.status);
    return this.status;
  };
};
//# sourceMappingURL=digitalWrite.js.map