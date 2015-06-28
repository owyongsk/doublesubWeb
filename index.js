var express   = require('express');
var app       = express();
var multer    = require('multer');
var doublesub = require('doublesub');
var fs        = require('fs');

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  languages = [["Albanian", "sq"], ["Arabian", "ar"], ["Armenian",   "hy"], ["Azeri",      "az"], ["Belarusian", "be"], ["Bosnian",    "bs"], ["Bulgarian",  "bg"], ["Catalan",    "ca"], ["Croatian",   "hr"], ["Czech",      "cs"], ["Chinese",    "zh"], ["Danish",     "da"], ["Dutch",      "nl"], ["English",    "en"], ["Estonian",   "et"], ["Finnish",    "fi"], ["French",     "fr"], ["Georgian",   "ka"], ["German",     "de"], ["Greek",      "el"], ["Hebrew",     "he"], ["Hungarian",  "hu"], ["Icelandic",  "is"], ["Indonesian", "id"], ["Italian",    "it"], ["Japanese",   "ja"], ["Korean",     "ko"], ["Latvian",    "lv"], ["Lithuanian", "lt"], ["Macedonian", "mk"], ["Malay",      "ms"], ["Maltese",    "mt"], ["Norwegian",  "no"], ["Polish",     "pl"], ["Portuguese", "pt"], ["Romanian",   "ro"], ["Russian",    "ru"], ["Spanish",    "es"], ["Serbian",    "sr"], ["Slovak",     "sk"], ["Slovenian",  "sl"], ["Swedish",    "sv"], ["Thai",       "th"], ["Turkish",    "tr"], ["Ukrainian",  "uk"], ["Vietnamese", "vi"]]
  res.render('index', { languages: languages });
});

app.post('/',[ multer({ inMemory: true }), function(req, res){
  optsObj = {
    srtString: req.files.srt.buffer.toString('utf8'),
    frLang:    req.body.frLang,
    toLang:    req.body.toLang,
    yandexKey: process.env.YANDEX_KEY
  }
  doublesub(optsObj, function(error, data){
    if (error) {
      res.send("SHIT JUST HAPPENED!")
    } else {
      res.setHeader('Content-disposition', 'attachment; filename=new.srt');
      res.setHeader('Content-type',        'text/plain');

      // Saves the translated file on upload
      var srt = req.files.srt
      var new_name = "upload/"+srt.originalname.slice(0, -4) + "-" + srt.name
      fs.writeFile(new_name, data, function(err) {
        if(err) { console.log(err); }
        console.log(new_name + " saved!");
      });
      res.send(data);
    }
  });
}]);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});
