const { HTTPRequest } = require("./HTTPRequest");

const address = "http://www.disney.co.kr";
const request = new HTTPRequest(address);

request.sendRequest();
