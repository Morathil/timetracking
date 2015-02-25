"use strict";

var TimeStore = require("./../stores/timeStore");

var TimeActionCreator = function() {

}

var publicMethods = function() {
	this.trackTime = function() {
		TimeStore.track();
	};
}

publicMethods.call(TimeActionCreator.prototype);

module.exports = new TimeActionCreator();

