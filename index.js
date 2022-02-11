const address = "http://www.disney.co.kr";
const url = new URL(address);
const { hostname } = url;
const dns = require("dns");

dns.lookup(hostname, function (error, addresses) {
  addre = addresses;

  const net = require("net");
  const socket = new net.Socket();

  socket.connect(80, addre);
  socket.on("connect", function () {
    const port = 80;
    const requestMsg = `GET / HTTP/1.1\r\nHost: ${addre}:${port}\r\n\r\n`;
    const result = socket.write(requestMsg);

    if (!result) {
      throw new Error("요청 실패");
    }

    this.on("data", function (data) {
      const response = data.toString();
      console.log(response);

      this.destroy();
    });
  });
});
