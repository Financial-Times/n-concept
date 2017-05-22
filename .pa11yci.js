const viewports = process.env.PA11Y_VIEWPORTS || [
	{
		width: 1440,
		height: 1220
	}
];

const urls = ['http://local.ft.com:5005/'];

const config = {
	defaults: {
		page: {},
		timeout: 50000,
		hideElements: 'iframe[src*=google],iframe[src*=proxy]',
		rules: ['Principle1.Guideline1_3.1_3_1_AAA']
	},
	urls: []
}

// Override with project specifics, if any
const exceptions = process.env.PA11Y_ROUTE_EXCEPTIONS ? process.env.PA11Y_ROUTE_EXCEPTIONS.split(',') : [];
config.defaults.page.headers = process.env.PA11Y_HEADERS ? JSON.parse(process.env.PA11Y_HEADERS) : {Cookie: 'next-flags=ads:off,sourcepoint:off,cookieMessage:off; secure=true'};
config.defaults.hideElements = process.env.PA11Y_HIDE ? `${process.env.PA11Y_HIDE},${config.defaults.hideElements}` : config.defaults.hideElements;

console.log('PA11Y_ROUTE_EXCEPTIONS:', process.env.PA11Y_ROUTE_EXCEPTIONS);
console.log('exceptions:', exceptions);
console.log('PA11Y_ROUTE_HEADERS:', process.env.PA11Y_ROUTE_HEADERS);
console.log('headers:', config.defaults.page.headers);
console.log('PA11Y_HIDE:', process.env.PA11Y_HIDE);
console.log('config.defaults.hideElements:', config.defaults.hideElements);

// Don't console.log headers once backend key is added to the object
config.defaults.page.headers['FT-Next-Backend-Key'] = process.env.FT_NEXT_BACKEND_KEY;


for (viewport of viewports) {
	for (url of urls) {
		url.viewport = viewport;
		config.urls.push(url);
	}
}

module.exports = config;
