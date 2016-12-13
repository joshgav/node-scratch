var appinsights   = require('applicationinsights');
var winston       = require('winston');
var app           = require('./package.json');

// start AppInsights data collection
// APPINSIGHTS_INSTRUMENTATIONKEY env var must be set
appinsights.setup().start();

// capture console.log output as traces
let original_log = console.log;
console.log = function new_log(message) {
  appinsights.getClient().trackTrace(message);
  original_log(message);
}

// register AppInsights to capture Winston traces
var appinsights_transport =
  require('winston-azure-application-insights').AzureApplicationInsightsLogger;

winston.add(appinsights_transport, {
  client: appinsights.getClient()
});
winston.info("AppInsights transport added to Winston.");

// run the user's app
require(`./${app.main}`);

