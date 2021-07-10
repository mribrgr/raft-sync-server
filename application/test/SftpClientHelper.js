const { SftpClient } = require("../src/sftpClient");

sftpClient = new SftpClient('mauritiusberger.de', 22000, 'raft', 'raft-sync-password');


async function test() {
    ret = await sftpClient.upload('upload.file');
    console.log(ret);
    ret = await sftpClient.list();
    console.log(ret);
    ret = await sftpClient.download('upload.file');
    console.log(ret);
}


test();