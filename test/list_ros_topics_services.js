var rosnodejs = require('rosnodejs');

rosnodejs.initNode('/humix', {onTheFly: true}).then((rosNode) => {

  //get list of existing publishers, subscribers, and services
  rosNode._node._masterApi.getSystemState("/humix").then((data) => {
    console.log("getSystemState, result", data, data.publishers[0]);
  });


});


