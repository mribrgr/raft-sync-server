const tmp = require('tmp');
const tmpobj = tmp.fileSync();
tmpobj.removeCallback();

const SaveStateHelper = require("../src/SaveStateHelper")
let was = SaveStateHelper.ofWorld("GANDILEBT");

let time = was.getTimeStamp();
was.saveAsTar("")

let wa2s = SaveStateHelper.ofTar("GANDILEBT");
let time2 = was.getTimeStamp();


let b = 0;