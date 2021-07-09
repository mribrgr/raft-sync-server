const path =  require ("path")
const fs = require ("fs")
const tar = require ("tar")
const { promisify } = require('util');

class SaveStateHelper {

    constructor(worldDir, worldName, timeStamp, isOfTar) {
        this.worldDir = worldDir;
        this.worldName = worldName;
        this.timeStamp = timeStamp;
        this.isOfTar = isOfTar;
    }

    static ofTar(filePath){
        let fileNameTime = path.basename(filePath).split("_");
        let timeStemp = fileNameTime[fileNameTime.length-1];

        let fileName = fileNameTime[0];
        return new SaveStateHelper(extracted(fileName), fileName, timeStemp, true);
    }

    static ofWorld(worldName){
        let worldDir = extracted(worldName);

        const stats = fs.statSync(worldDir);
        let timeStamp = stats.mtime;
        console.log(`File Data Last Modified: ${stats.mtime}`);
        console.log(`File Status Last Modified: ${stats.ctime}`);

        return new SaveStateHelper(worldDir, worldName, timeStamp, false);
    }


    getTimeStamp(){
        return this.timeStamp;
    }

    saveAsTar(destinationPath){
        promisify(tar.create)(
            {
                gzip: true,
                file: this.worldName +  + ".tar",
                cwd: path.resolve(path.dirname(this.worldDir)),

            },
            [this.worldDir]
        )
    }

    saveAsWorld(destinationPath){
        fs.copy(this.worldDir, destinationPath);
    }

}

function extracted(worldName) {
    let userBasePath = "AppData/LocalLow/Redbeet Interactive/Raft/User/";
    let worldBasePath = "/World/";
    let userHome = process.env.HOME;

    let worldDir = fromDir(
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
    return worldDir;
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