"use strict";

var RSVP = require("rsvp");

var LocalNotifications = require("./LocalNotificationUtils");
var TimeStore = require("../stores/TimeStore");

var GeoLocationUtils = function() {
	this._targetPosition = {
		latitude: 48.201699,
		longitude: 16.388884
	};

  document.addEventListener("deviceready", this._init.bind(this), false);
}

var publicMethods = function() {

}

var privateMethods = function() {
  this._init = function() {
    console.log("init");
    new RSVP.Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function(tmp) {
      console.log(tmp)
    });

    navigator.geolocation.watchPosition(this._onChangeDetected.bind(this));
  };

  this._onChangeDetected = function(currentPosition) {
		var distanceToTarget = this.distanceToTarget(currentPosition);
		var isWorking = TimeStore.getIsWorking();

		if (isWorking && distanceToTarget * 1000 >= 100) {
			LocalNotifications.send();
		} else if (!isWorking && distanceToTarget * 1000 <= 100) {
			LocalNotifications.send();
		}
  };

	this.distanceToTarget = function(currentPosition) {
	    var lat1 = currentPosition.coords.latitude;
	    var radianLat1 = lat1 * (Math.PI / 180);
	    var lng1 = currentPosition.coords.longitude;
	    var radianLng1 = lng1 * (Math.PI / 180);
	    var lat2 = this._targetPosition.latitude;
	    var radianLat2 = lat2 * (Math.PI / 180);
	    var lng2 = this._targetPosition.longitude;
	    var radianLng2 = lng2 * (Math.PI / 180);
	    var earth_radius = 6371;
	    var diffLat = (radianLat1 - radianLat2);
	    var diffLng = (radianLng1 - radianLng2);
	    var sinLat = Math.sin(diffLat / 2);
	    var sinLng = Math.sin(diffLng / 2);
	    var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
	    var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
	    return distance.toFixed(3);
	}
}

privateMethods.call(GeoLocationUtils.prototype);
publicMethods.call(GeoLocationUtils.prototype);

module.exports = new GeoLocationUtils();