var fs = require('fs');
var babel = require('babel-core');

var fileName = process.argv[2];

fs.readFile(fileName, function(err, data) {
  if(err) throw err;
  var src = data.toString();
  var out = babel.transform(src, {
    plugins: [['./lib/index.js',{
      input: 'test/*.js',
      output: 'test/index.js'
    }]]
  });
  console.log(out.code);
});
