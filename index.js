var HumixSense = require('humix-sense');
var Conv = require('./index');
var fs = require('fs');
var rosnodejs = require('rosnodejs');
const geometry_msgs = rosnodejs.require('geometry_msgs').msg;

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
var pub;

console.log('========= starting humix-ros ===========');

rosnodejs.initNode('/humix', {onTheFly: true}).then((rosNode) => {
    ros = rosNode;
    console.log('========= ROS Ready ===========');

    pub = rosNode.advertise( '/turtle1/cmd_vel', geometry_msgs.Twist,
        {
        queueSize: 1,
        latching: true,
        throttleMs: 9
        }
    );
});


/*
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

}*/


function call_robot_cmd(i_cmd){
    const msg = new geometry_msgs.Twist();

    JSON.parse(i_cmd, function (key, value) {
        l('key='+key);
        l('value='+value);
        
        if (key == "x") {
            msg.linear.x = value;
        } else if(key == "yaw") {
            msg.angular.z = value;
        }
    });
    

    l('i_cmd='+i_cmd+', x='+msg.linear.x + ', yaw='+msg.angular.z);
    
    
    
    pub.publish(msg);
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


    logger.info('Communication with humix-sense is now ready.');

    hsm.on("robot_cmd", function (data) {
        logger.info('received robot_cmd data:'+data);

        call_robot_cmd(data);
    })


});