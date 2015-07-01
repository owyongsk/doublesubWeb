function calculateHash(d) {
  function binl2hex(a) {
    var b = 255;
    a[1] += a[0] >> 8;
    a[0] = a[0] & b;
    a[2] += a[1] >> 8;
    a[1] = a[1] & b;
    a[3] += a[2] >> 8;
    a[2] = a[2] & b;
    a[4] += a[3] >> 8;
    a[3] = a[3] & b;
    a[5] += a[4] >> 8;
    a[4] = a[4] & b;
    a[6] += a[5] >> 8;
    a[5] = a[5] & b;
    a[7] += a[6] >> 8;
    a[6] = a[6] & b;
    a[7] = a[7] & b;
    for (var d = "0123456789abcdef", e = "", c = 7; c > -1; c--) e += d.charAt(a[c] >> 4 & 15) + d.charAt(a[c] & 15);
    return e
  }

  var b = 65536;
  var e = Array(8);
  pngFile = d[0];
  if (pngFile.fileSize) fs = pngFile.fileSize;
  else fs = pngFile.size;
  for (var a = fs, f = 0; f < 8; f++) {
    e[f] = a & 255;
    a = a >> 8
  }
  a = fs;
  if (pngFile.slice) var c = pngFile.slice(0, b);
  else if (pngFile.mozSlice) var c = pngFile.mozSlice(0, b);
  else if (pngFile.webkitSlice) var c = pngFile.webkitSlice(0, b);
  var g = new FileReader;
  g.onloadend = function (h) {
    if (h.target.readyState == FileReader.DONE) {
      for (var f = h.target.result, d = 0; d < f.length; d++) e[(d + 8) % 8] += f.charCodeAt(d);
      if (pngFile.slice) c = pngFile.slice(a - b);
      else if (pngFile.mozSlice) c = pngFile.mozSlice(a - b, a);
      else if (pngFile.webkitSlice) c = pngFile.webkitSlice(a - b, a);
      var g = new FileReader;
      g.onloadend = function (c) {
        var b = "languages";
        if (c.target.readyState == FileReader.DONE) {
          f = c.target.result;
          for (d = 0; d < f.length; d++) e[(d + 8) % 8] += f.charCodeAt(d);
          a = 'all';
          console.log(binl2hex(e));
        }
      };
      g.readAsBinaryString(c)
    }
  };
  g.readAsBinaryString(c)
}

module.exports = calculateHash;
