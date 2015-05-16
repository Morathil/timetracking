"use strict";

var RSVP = require("rsvp");

var TimeStore = require("../stores/TimeStore");
var TimeActions = require("../actions/TimeActions");

var LocalNotificationUtils = function() {
  this._handledNotifications = {};
}

var publicMethods = function() {
  this.send = function() {
    var that = this;
    var title = TimeStore.getIsWorking() ? "Leaving location:" : "Reached location:";
    var text = TimeStore.getIsWorking() ? "Stop timetracking?" : "Start timetracking?";

    cordova.plugins.notification.local.schedule({
        id: new Date().getTime(),
        title: title,
        text: text
    });

    cordova.plugins.notification.local.on("click", function (notification) {
      if (!that._handledNotifications[notification.id]) {
        that._handledNotifications[notification.id] = true;
        TimeActions.trackTime();    
      }
    });
  };
}

var privateMethods = function() {

}

privateMethods.call(LocalNotificationUtils.prototype);
publicMethods.call(LocalNotificationUtils.prototype);

module.exports = new LocalNotificationUtils();