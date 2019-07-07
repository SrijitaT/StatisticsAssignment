const thrift = require('thrift');
const CalculateStatisticsService = require('./CalculateStatisticsService');
const assert = require('assert');

var options = {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol,
  path: "/stats",
  headers: {"Connection": "close"},
  https: false
  };
  
  const connection = thrift.createHttpConnection("localhost", 9090, options);
  const client = thrift.createHttpClient(CalculateStatisticsService, connection);
  
  connection.on("error", function(err) {
  console.log("Error: " + err);
  });

module.exports = client;