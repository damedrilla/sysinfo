const express = require("express");
const PORT = 322;
const app = express();
const humanizeDuration = require("humanize-duration");
const si = require("systeminformation");
var os 	= require('os-utils');
app.use(express.json());
app.listen(PORT, () => console.log(`open at http://localhost:${PORT}`));

si.cpu()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

  var cpuUse = 0
  var temp = 0
  var timeSinceTurnedOn = ""
  var memoryUsage = 0
  setInterval(()=>{getUsage()}, 1000);

  async function getUsage() {
    temp = await si.cpuTemperature();
    timeSinceTurnedOn = await si.time();
    memoryUsage = await si.mem();
 
    os.cpuUsage((usage)=>{
     cpuUse = usage * 1000 
   });
 }

 app.get("/cputemp", (req, res) => {
    res.status(200).send({
      temp: temp.main,
      uptime: humanizeDuration(timeSinceTurnedOn.uptime * 1000),
      totalMemory: memoryUsage.total,
      memUsed: memoryUsage.used,
      memFree: memoryUsage.free,
      cpuUsage: cpuUse
    });
  });
  