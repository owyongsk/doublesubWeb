(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 *     temporarily removing the ability to search by hash
 *
window.open_sub_compute = require('./hash.js');
var xmlrpc              = require('xmlrpc');

var searchOpenSubs = function(os_identifier, callback){
  client = xmlrpc.createClient({ host: "api.opensubtitles.org", path: "/xml-rpc" });

  client.methodCall('LogIn', ["","","en","OSTestUserAgent"], function(err, res) {
    if (err) callback(err)
    var token = res.token;
    console.log("LOGGED IN WITH TOKEN: "+token);
    client.methodCall('SearchSubtitles'
      , [token, [{sublanguageid: "eng", moviehash: os_identifier.hash
                  , moviebytesize: os_identifier.bytesize}]]
      , function(err,res){
        if(err){
          callback(err)
          client.methodCall('LogOut', [token], function(err,res){console.log("LOGGED OUT!");})
        }
        console.log("OS RETURNED SOME SHIT");
        client.methodCall('LogOut', [token], function(err,res){console.log("LOGGED OUT!");})
        callback(null, res)
    });
  });
}
**/

$("input:file").change(function(e) {
  $(".btn.right").prop("disabled", false);

  /**
   *   temporarily removing the abiltiy to search by hash
   *
  open_sub_compute(e.target.files, function(err, res){
    if(err) callback(err)
    console.log(res);
    searchOpenSubs(res, function(e,r){
      if (e) console.error(e)
      console.log(r);
    });
  });
  **/
});

},{}]},{},[1]);
