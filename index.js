var express   = require('express');
var app       = express();
var multer    = require('multer');
var doublesub = require('doublesub');
var fs        = require('fs');
var Readable  = require('stream').Readable

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/',[ multer({ inMemory: true }), function(req, res){
  optsObj = {
    srtString: req.files.srt.buffer.toString('utf8'),
    frLang:    "es",
    toLang:    "en",
    yandexKey: process.env.YANDEX_KEY
  }
  doublesub(optsObj, function(error, data){
    if (error) { res.send("SHIT JUST HAPPENED!") }

    res.setHeader('Content-disposition', 'attachment; filename=new.srt');
    res.setHeader('Content-type',        'text/plain');

    var s = new Readable;
    s.push(data);
    s.push(null);

    s.pipe(res);
  });
}]);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
