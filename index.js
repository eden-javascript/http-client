const { HTTPRequest } = require("./HTTPRequest");

const main = async () => {
  const address = "http://www.disney.co.kr";

  const request = new HTTPRequest(address);
  const response = await request.sendRequest();

  console.log(response);
};

main();
