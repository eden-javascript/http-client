const dns = require("dns");
const net = require("net");

class HTTPRequest {
  constructor(address) {
    this.hostname = new URL(address).hostname;
    this.response = null;
    this.socket = new net.Socket();
    this.response = null;
  }

  dns2ip() {
    return new Promise((resolve, reject) => {
      dns.lookup(this.hostname, function (error, ipAddress) {
        if (error) {
          reject(error);
        }

        resolve(ipAddress);
      });
    });
  }

  async sendRequest(method = "GET", headers = "") {
    const port = 80;
    const ipAddress = await this.dns2ip();

    return new Promise((resolve) => {
      this.socket.connect(port, ipAddress);
      this.socket.on("connect", function () {
        const makeMsg = (ipAddress, port, method) => {
          return `${method} / HTTP/1.1\r\nHost: ${ipAddress}:${port}\r\n${headers}\r\n\r\n`;
        };

        const requestMsg = makeMsg(ipAddress, port, method);
        const result = this.write(requestMsg);

        if (!result) {
          throw new Error("요청 실패");
        }

        this.on("data", async function (data) {
          const response = data.toString();

          this.destroy();

          resolve(response);
        });
      });
    });
  }
}

module.exports = {
  HTTPRequest,
};
