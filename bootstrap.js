const dotenv        = require('dotenv').config();
const appInsights   = require('applicationinsights');
const pkg           = require('./package.json');

if (!process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  process.exitCode = 2;
  throw new Error("Expected ai env var.");
}

// start AppInsights data collection
// APPINSIGHTS_INSTRUMENTATIONKEY env var must be set
appInsights.setup()
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .start();

// capture console.log output as traces
let original_log = console.log;
console.log = function new_log(message) {
  appInsights.getClient().trackEvent(message);
  original_log(message);
}

// register AppInsights to capture Winston traces
const winston = require('winston');
const winstonAiTransport =
  require('winston-azure-application-insights')
  .AzureApplicationInsightsLogger;

winston.add(winstonAiTransport, {
  client: appInsights.getClient()
});
winston.info("AppInsights transport added to Winston.");

// run the user's app
require(`./${pkg.main}`);

