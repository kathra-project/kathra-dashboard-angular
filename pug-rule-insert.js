/**
 * Inserts inside node_modules angular-devkit sources the rule needed to transpile pug|jade files into html. 
 * @commonCliConfig: `./node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js`
 * @pug_rule: `{ test: /.(pug|jade)$/, loader: "apply-loader!pug-loader?self" }`
 */

const fs = require('fs');
const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';
const pug_rule = `\n                { test: /.(pug|jade)$/, loader: "apply-loader!pug-loader?self" },`;

fs.readFile(commonCliConfig, function(err, data){
  
  if (err) { throw err; }
  const configText = data.toString(); 
  
  // Make sure we don't add the rule if it already exists
  if (configText.indexOf(pug_rule) > -1) { return; }
  
  // Insert the pug webpack rule
  const position = configText.indexOf('rules: [') + 8;
  const output = [configText.slice(0, position), pug_rule, configText.slice(position)].join('');
  const file = fs.openSync(commonCliConfig, 'r+');
  
  fs.writeFile(file, output);
  fs.close(file);
});