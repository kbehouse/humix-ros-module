## Overview

ROS module for Humix 

You shoule install the following packages for humix:

https://github.com/project-humix/humix-think

https://github.com/project-humix/humix-sense

Install Humix Guide:

https://hackpad.com/Humix-Installation-Guide-yIkJDZZRGof

Install ROS version "kinetic":

http://wiki.ros.org/kinetic/Installation 

# Get Started

## Download and install dependencies

* Install humix-ros-module
```
git clone git@github.com:kbehouse/humix-ros-module.git
cd humix-ros-module
npm install
```


## Start module

* Start ROS (for this example)
```
# ROS core
roscore

# turtlebot  (Default install in ROS)
rosrun turtlesim turtlesim_node
```

* Start Humix
```
#start humix-think
cd ~/humix/humix-think/
npm start

#start humix-sense
cd ~/humix/humix-sense
npm start

#start humix-ros-module
cd ~/humix/humix-ros-module
npm start
```

* Open Humix
http://localhost:3000



