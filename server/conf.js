var version = require('../package.json').version;

let platformManagerEndpoint = ""; //wss://platformmanager.kathra-dev.irtsystemx.org/spm
let appManagerEndpoint = ""; //http://appmanager.kathra-dev.irtsystemx.org/api/v1
let pipelineEndpoint = "";
let serviceDomain = "irtsystemx.org";

if(process.env.SERVICE_DOMAIN)
	serviceDomain = process.env.SERVICE_DOMAIN;

if(process.env.PLATFORM_MGR_ENDPOINT)
	platformManagerEndpoint = process.env.PLATFORM_MGR_ENDPOINT;

if(process.env.APP_MGR_ENDPOINT)
	appManagerEndpoint = process.env.APP_MGR_ENDPOINT;

if(process.env.PIPELINE_ENDPOINT)
	pipelineEndpoint = process.env.PIPELINE_ENDPOINT;

serverConf = {
	platform_manager_endpoint : platformManagerEndpoint,
	app_manager_endpoint : appManagerEndpoint,
	pipeline_endpoint: pipelineEndpoint,
	service_domain: serviceDomain,
	kathra_version: {
		version: version.split("-")[0],
		cycle: version.split("-")[1] || "release"
	}
}

module.exports = serverConf;