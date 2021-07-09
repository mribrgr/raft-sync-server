const { SftpClient } = require("../src/sftpClient");

sftpClient = new SftpClient('mauritiusberger.de', 22000, 'raft', 'raft-sync-password');

sftpClient.download('package.json');
// console.log(sftpClient.list());