const dotenv = require('dotenv')
dotenv.config({ path: ".env" })
dotenv.config({ path: "run.env" })
if (!process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  process.exitCode = 2;
  throw new Error("set app insights ikey as APPINSIGHTS_INSTRUMENTATIONKEY");
}
const appInsights = require('applicationinsights')

appInsights.setup()
  .setAutoDependencyCorrelation(true)
  .setAutoCollectConsole(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .start();

// run the user's app
require('./' + require('./package.json').main);