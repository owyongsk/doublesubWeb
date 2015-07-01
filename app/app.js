window.hash = require('./hash.js');
var xmlrpc  = require('xmlrpc');

client = xmlrpc.createClient({ host: "api.opensubtitles.org", path: "/xml-rpc" });

client.methodCall('LogIn', ["","","en","OSTestUserAgent"], function(err, res) {
  var token = res.token;
  client.methodCall('SearchSubtitles', [token, [{sublanguageid: "eng", moviehash: '51df0bf1a563628e', moviebytesize: '793302687'}]], function(err,res){
    debugger
  });
  client.methodCall('LogOut', [token], function(err,res){console.log("LOGGED OUT!");})
});
