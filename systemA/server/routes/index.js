var express = require("express");
var router = express.Router();
const client=require("../rpcClient/index");
const paramConst=require("../constants");

router.get("/actions", function(req, res, next) {
  const { method, payload, ts } = req.query;
  let flag = false,
    payloadStr = "",
    x;
  if (payload && payload.indexOf("[") && payload.indexOf("]"))
  {
    payloadStr = payload.substring(
      payload.indexOf("[") + 1,
      payload.indexOf("]")
    );
  }

  let entry = payloadStr.split(",");
  
  if (method && typeof method == "string") {
    switch (method) {
      case paramConst.IS_VALID_ENTRY:
      console.log("entry",entry);
        if (Array.isArray(entry) && entry.length >= 2) {
          flag = entry.every(p => {
            x = parseFloat(p);
            console.log("x="+x);
            return typeof x === "number" && Number.isInteger(x);
          });
        } else {
          flag = false;
        }
      return res.status(flag ? 200 : 400).send({ isValid: flag });
      case paramConst.CALCULATE_STATS:
        client.calculateStat(entry)
        .then(resp=>{
          return res.status(200).send(resp);
        }).catch(err=>{
          console.log(err);
        })
        break;
      case paramConst.GEN_RAND:
        client.generateNums()
        .then(resp=>{
          console.log(resp);
          return res.status(200).send(resp);
        }).catch(err=>console.log(err))
        break;
      case paramConst.PING:
      // Create a CalculateStatisticsService client with the connection
        client.ping()
        .then(function() {
          console.log('ping()');
        })
        .catch(err=>console.log(err));
        break;
      default:
        console.log("Sorry wrong option");
    }
  } else {
    console.log("No method given");
  }
});

module.exports = router;
