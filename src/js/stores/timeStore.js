"use strict";

var LocalStorageUtils = require("./../utils/LocalStorageUtils");
var Dispatcher = require("./../dispatcher/Dispatcher");

var TimeStore = function() {}

var publicMethods = function() {
  this.emitChange = function() {
    this.trigger("change");
  };

  this.track = function() {
    var now = new Date().getTime();
    var workingTime = LocalStorageUtils.get("workingTime");

    if (!this.getIsWorking()) {
      workingTime.push({
        startTime: now
      });
    } else {
      workingTime[workingTime.length - 1].endTime = now;
    }

    LocalStorageUtils.set("workingTime", workingTime);
  };

  this.undo = function() {
    var workingTime = LocalStorageUtils.get("workingTime");

    if (workingTime.length > 0 && !this.getIsWorking()) {
      delete workingTime[workingTime.length - 1].endTime;
    } else {
      workingTime.pop();
    }

    LocalStorageUtils.set("workingTime", workingTime);
  };

  this.getIsWorking = function() {
    var workingTime = LocalStorageUtils.get("workingTime");

    if (workingTime.length <= 0) {
      return false;
    }

    var latestEntry = workingTime[workingTime.length - 1];

    return latestEntry.startTime && !latestEntry.endTime;
  };

  this.getWorkingTimes = function() {
    var workingTimes = LocalStorageUtils.get("workingTime");
    return workingTimes.reverse();
  };
}

var privateMethods = function() {}

privateMethods.call(TimeStore.prototype);
publicMethods.call(TimeStore.prototype);
asEvented.call(TimeStore.prototype);

var TimeStore = new TimeStore();

Dispatcher.register(function(action) {
  switch (action.type) {
    case "trackTime":
      TimeStore.track();
      TimeStore.emitChange();
      break;

    case "undo":
      TimeStore.undo();
      TimeStore.emitChange();
      break;
  }
});

module.exports = TimeStore;