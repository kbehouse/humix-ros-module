var rosnodejs = require('rosnodejs');

rosnodejs.initNode('/nodered', {onTheFly: true}).then((rosNode) => {

  // get list of existing publishers, subscribers, and services
//   rosNode._node._masterApi.getSystemState("/nodered").then((data) => {
//     console.log("getSystemState, result", data, data.publishers[0]);
//   });

  const RobotCommand = rosnodejs.require('arc_ui').srv.RobotCommand;
  const robot_cmd_request = new RobotCommand.Request({
    cmd: 'shake'
  });

  let serviceClient = rosNode.serviceClient("/robot_cmd",
                                             "arc_ui/RobotCommand");

  rosNode.waitForService(serviceClient.getService(), 2000)
    .then((available) => {
      if (available) {
        serviceClient.call(robot_cmd_request, (resp) => {
          console.log('Service response ' + JSON.stringify(resp));
        });
      } else {
        console.log('Service not available');
      }
    });

});