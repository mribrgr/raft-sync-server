const Client = require('ssh2-sftp-client');
const fs = require('fs');

class SftpClient {
    constructor(host, port, username, password) {
        // const config = {
        //     host: this.host,
        //     port: this.port,
        //     username: this.username,
        //     password: this.password
        // };

        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;

        this.sftp = new Client();
    }

    /**
     * @return null on error
     */
    async upload(filename) {
        let locale = fs.createReadStream(filename);
        let remote = `/sftp/${filename}`;
        let list = undefined;

        let result = this.sftp.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        }).then(() => {
            return this.sftp.put(locale, remote);
        }).then(data => {
            list = data;
            return this.sftp.end();
        }).then(async data => {
            return list;
        }).catch(err => {
            return err;
        });

        return await result.then(data => {return data;});
    }

    async list() {
        let list = undefined;

        let result = this.sftp.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        }).then(() => {
            return this.sftp.list('/sftp');
        }).then(data => {
            list = data;
            return this.sftp.end();
        }).then(async data => {
            return list;
        }).catch(err => {
            return err;
        });

        return await result.then(data => {return data;});
    }

    /**
     * @return null on error
     */
    async download(filename) {
        let remote = `/sftp/${filename}`;
        let locale = fs.createWriteStream(filename);
        let list = undefined;

        let result = this.sftp.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        }).then(() => {
            return this.sftp.get(remote, locale);
        }).then(data => {
            list = data;
            return this.sftp.end();
        }).then(async data => {
            return list;
        }).catch(err => {
            return null;
        });

        return await result.then(data => {return data;});
    }
}

module.exports = { SftpClient }