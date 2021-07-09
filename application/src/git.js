const git = require('git-client');

class GitSync{
    constructor(file) {
        this.file = file;
    }

    async syncFils(){
        await git('fetch');
        await git('pull');


    }


}