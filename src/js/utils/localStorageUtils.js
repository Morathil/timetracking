"use strict";

var LocalStorageUtils = function() {

}

var publicMethods = function() {
	this.set = function(lsKey, data) {
		data = JSON.stringify(data);
		localStorage.setItem(lsKey, data);
	}

	this.get = function(lsKey) {
		var dataString = localStorage.getItem(lsKey);
		return (dataString ? JSON.parse(dataString) : null);
	};
}

publicMethods.call(LocalStorageUtils.prototype);

module.exports = new LocalStorageUtils();

