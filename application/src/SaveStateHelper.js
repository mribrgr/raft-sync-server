const path =  require ("path")
const fs = require ("fs")


class SaveStateHelper {

    constructor(worldName) {
        let userBasePath= "AppData/LocalLow/Redbeet Interactive/Raft/User/";
        let worldBasePath = "/World/";
        let userHome = process.env.HOME;

        this.worldName = worldName;
        this.worldDir = fromDir(
            path.join(
                path.join(
                    fromDir(
                        path.join(
                            userHome,
                            userBasePath),
                        "User_"),
                    "World"),
                worldName),
            "-Latest");

        const stats = fs.statSync('file.txt');

        // print file last modified date
        console.log(`File Data Last Modified: ${stats.mtime}`);
        console.log(`File Status Last Modified: ${stats.ctime}`);
    }

    getTimeStamp(){
        return this.timeStamp;
    }

    saveAsTar(){

    }

}

function fromDir(startPath,filter){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    let files=fs.readdirSync(startPath);
    for(let i=0;i<files.length;i++){
        let filename=path.join(startPath,files[i]);
        let stat = fs.lstatSync(filename);

        if (filename.indexOf(filter)>=0) {
            return filename;
        };
    };
};

module.exports = SaveStateHelper;