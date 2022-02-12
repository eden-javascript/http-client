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

  getResponse(response) {
    return new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      }

      resolve(response);
    });
  }

  async sendRequest() {
    const port = 80;
    const ipAddress = await this.dns2ip();

    this.socket.connect(port, ipAddress);
    this.socket.on("connect", function () {
      const requestMsg = `GET / HTTP/1.1\r\nHost: ${ipAddress}:${port}\r\n\r\n`;
      const result = this.write(requestMsg);

      if (!result) {
        throw new Error("요청 실패");
      }

      this.on("data", async function (data) {
        const response = data.toString();
        console.log(response);

        this.destroy();
      });
    });
  }
}

module.exports = {
  HTTPRequest,
};
