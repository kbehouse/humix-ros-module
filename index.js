var HumixSense = require('humix-sense');
var Conv = require('./index');
var fs = require('fs');
var rosnodejs = require('rosnodejs');


var config = {
    "moduleName" : "humix-ros-module",
    "commands" : ["robot_cmd"],
    "events" : ["robot_event"],
    "log" : {
        file : 'humix-ros-module.log',
        fileLevel : 'info',
        consoleLevel : 'debug'
      }
};
l = console.log;

var humix = new HumixSense(config);
var hsm;
var logger;
var ros;

console.log('========= starting humix-ros ===========');

rosnodejs.initNode('/nodered', {onTheFly: true}).then((rosNode) => {
    ros = rosNode;
    console.log('========= ROS Ready ===========');
});

function call_robot_cmd(i_cmd){
  const RobotCommand = rosnodejs.require('arc_ui').srv.RobotCommand;
  const robot_cmd_request = new RobotCommand.Request({
    cmd: i_cmd
  });

  let serviceClient = ros.serviceClient("/robot_cmd",
                                             "arc_ui/RobotCommand");

  ros.waitForService(serviceClient.getService(), 2000)
    .then((available) => {
      if (available) {
        serviceClient.call(robot_cmd_request, (resp) => {
          console.log('Service response ' + JSON.stringify(resp));
        });
      } else {
        console.log('Service not available');
      }
    });

}

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;

    logger = hsm.getLogger();

    logger.info('access config');
    var conf = hsm.getDefaultConfig();

    if(!conf){

        if(fs.existsSync('./config.js')){

            logger.info('using local config file')
            conf = require('./config.js');

        }else{

            logger.error('fail to load ros config. Exit');
            process.exit(1);
        }

    }

    logger.info('loading config: '+ JSON.stringify(conf));
    //conversation = new Conv(conf, logger)
   // conversation.init();

    logger.info('Communication with humix-sense is now ready.');

    hsm.on("robot_cmd", function (data) {
        logger.info('received robot_cmd data:'+data);

        call_robot_cmd(data);
        // TODO : Check the type of data.
        //conversation.say(data);
    })

    // conversation.on('msg', function(msg) {
    //     logger.debug('about to publish:' + msg);

    //     if(hsm){
    //         hsm.event('stt', msg);
    //     }
    // });

});