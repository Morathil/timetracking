"use strict";

var LocalStorageUtils = require("./../utils/localStorageUtils");

var TimeStore = function() {}

var publicMethods = function() {
	this.track = function() {	
		this._updateWorkingTime();
		this._triggerChange();
	};

	this.getIsWorking = function() {
		var workingTime = LocalStorageUtils.get("workingTime")
		if (!workingTime) {
			return false;
		}

		var latestEntry = workingTime.entries[workingTime.lastEntryAt];
		
		return latestEntry.startTime && !latestEntry.endTime;
	};
}

var privateMethods = function() {
	this._triggerChange = function() {
		this.trigger("change");
	};

	this._updateWorkingTime = function() {
		var now = new Date().getTime();
		var workingTime = LocalStorageUtils.get("workingTime") || {};

		if (!this.getIsWorking()) {
			workingTime.lastEntryAt = now;	
			workingTime.entries = workingTime.entries || {};
			workingTime.entries[now] = {startTime: now};
		} else {
			workingTime.entries[workingTime.lastEntryAt].endTime = now;
		}

		LocalStorageUtils.set("workingTime", workingTime);
	};
}

privateMethods.call(TimeStore.prototype);
publicMethods.call(TimeStore.prototype);
asEvented.call(TimeStore.prototype);

module.exports = new TimeStore();