var ikey = 'ce00d434-39b5-4a5b-bf0f-4fc6ce8380a7';
var main = './index.js';
process.env.APPINSIGHTS_INSTRUMENTATIONKEY = ikey;

var appinsights = require('applicationinsights');
appinsights.setup().start();

let original_log = console.log;
console.log = function new_log(message) {
  appinsights.getClient().trackTrace(message);
  original_log(message);
}

require(main);

