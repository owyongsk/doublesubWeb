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

$("input:file").change(function(e) {
  open_sub_compute(e.target.files, function(err, res){
    if(err) callback(err)
    searchOpenSubs(res, function(e,r){
      if (e) console.error(e)
      console.log(r);
    });
  });
});
