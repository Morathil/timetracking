"use strict";

var RSVP = require("RSVP");
var TIMEOUT = 13 * 1000;

module.exports = {
  parseResponse: function(status, response) {
    return new RSVP.Promise(function(resolve, reject) {
      if ((status >= 200 && status < 300) || status === 304) {
        try {
          response = response || null;
          var json = JSON.parse(response);
          resolve(json);
        } catch (e) {
          e.response = response;
          reject(e);
        }
      } else {
        var e = new Error("Server responded with a status of " + status);
        e.status = status;
        e.response = response;
        reject(e);
      }
    });
  },
  send: function(method, url, data, header) {
    var that = this;
    return new RSVP.Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();

      if (method === "GET") {
        if (data) {
          url += "?" + data.join("&");
        }
      } else {
        data = JSON.stringify(data);
      }

      req.onreadystatechange = function(event) {
        if (req.readyState !== 4) {
          return;
        }

        that.parseResponse(req.status, req.response)
          .then(resolve)
          .catch(reject);
      };

      req.open(method, url, true);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      if (header) {
        req.setRequestHeader(header.key, header.value);
      }

      req.timeout = TIMEOUT;
      req.send(data);
    });
  }
};