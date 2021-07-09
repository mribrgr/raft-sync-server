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
    upload(filename) {
        let locale = fs.createReadStream(filename);
        let remote = `/sftp/${filename}`;

        this.sftp.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        })
        .then(() => {
            return this.sftp.put(locale, remote);
        })
        .then(ret => {
            console.log(ret);
        })
        .then(() => {
            this.sftp.end();
        })
        .catch(err => {
            return null;
        });
    }

    list() {
        let list = undefined;

        this.sftp.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        }).then(() => {
            return this.sftp.list('/sftp');
        }).then(data => {
            list = data;
            return this.sftp.end();
        }).then(data => {
            console.log(list, 'erstes Ergebnis');
            return list;
        }).catch(err => {
            return null;
        });
    }

    /**
     * @return null on error
     */
    download(filename) {
        let remote = `/sftp/${filename}`;
        let locale = fs.createWriteStream(filename);

        this.sftp.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        })
        .then(() => {
            return this.sftp.get(remote, locale);
        })
        .then(ret => {
            console.log(ret);
        })
        .then(() => {
            this.sftp.end();
        })
        .catch(err => {
            return null;
        });
    }
}

module.exports = { SftpClient }