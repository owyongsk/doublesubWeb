var express   = require('express');
var app       = express();

var multer    = require('multer');
var doublesub = require('doublesub');
var fs        = require('fs');
var exec      = require('child_process').exec;

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  console.log(new Date().toString());
  console.log(req.headers);
  languages = [["Albanian", "sq"], ["Arabian", "ar"], ["Armenian",   "hy"], ["Azeri",      "az"], ["Belarusian", "be"], ["Bosnian",    "bs"], ["Bulgarian",  "bg"], ["Catalan",    "ca"], ["Croatian",   "hr"], ["Czech",      "cs"], ["Chinese",    "zh"], ["Danish",     "da"], ["Dutch",      "nl"], ["English",    "en"], ["Estonian",   "et"], ["Finnish",    "fi"], ["French",     "fr"], ["Georgian",   "ka"], ["German",     "de"], ["Greek",      "el"], ["Hebrew",     "he"], ["Hungarian",  "hu"], ["Icelandic",  "is"], ["Indonesian", "id"], ["Italian",    "it"], ["Japanese",   "ja"], ["Korean",     "ko"], ["Latvian",    "lv"], ["Lithuanian", "lt"], ["Macedonian", "mk"], ["Malay",      "ms"], ["Maltese",    "mt"], ["Norwegian",  "no"], ["Polish",     "pl"], ["Portuguese", "pt"], ["Romanian",   "ro"], ["Russian",    "ru"], ["Spanish",    "es"], ["Serbian",    "sr"], ["Slovak",     "sk"], ["Slovenian",  "sl"], ["Swedish",    "sv"], ["Thai",       "th"], ["Turkish",    "tr"], ["Ukrainian",  "uk"], ["Vietnamese", "vi"]]
  res.render('index', { languages: languages });
});

app.post('/',[ multer({ inMemory: true }), function(req, res){
  console.log(new Date().toString());
  console.log(req.headers);

  var nameArr = req.body.file_name.split(".");
  var name = nameArr.splice(0, nameArr.length - 1).join(".");

  com = "subliminal download -e utf8 -d tmp -l " +
        req.body.frLang + " " + req.body.file_name;
  console.log(com);

  exec(com, function(err1, stdout, stderr){
    if (err1) {
      res.send("SHIT JUST HAPPENED!")
    } else {
      fs.readFile("./tmp/"+name+"."+req.body.frLang+".srt", "utf8", function(err2, string){
        if (err2) {
          res.send("SHIT JUST HAPPENED!")
        } else {
          optsObj = {
            srtString: string,
            frLang:    req.body.frLang,
            toLang:    req.body.toLang,
            yandexKey: process.env.YANDEX_KEY
          }
          doublesub(optsObj, function(err3, data){
            if (err3) {
              res.send("SHIT JUST HAPPENED!")
            } else {
              newFileName = name+"."+req.body.frLang+"."+req.body.toLang+".srt";

              // Saves the translated file on upload
              var newFile = "upload/"+newFileName;
              fs.writeFile(newFile, data, function(err4) {
                if(err4) { console.log(err4); }
                console.log(newFile + " saved!");
                res.download(newFile);
              });
            }
          });
        }
      });
    }
  });
}]);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});
