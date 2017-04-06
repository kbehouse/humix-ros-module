## Overview

ROS module for Humix 

You shoule install the following packages for humix:

https://github.com/project-humix/humix-think

https://github.com/project-humix/humix-sense

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
* Install  ROBOTIS-MANIPULATOR-H for ROS simulator

http://wiki.ros.org/ROBOTIS-MANIPULATOR-H


## Start module
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

* Start ROS (for this example)
```
#start manipulator_h_manager
roslaunch manipulator_h_manager manipulator_h_manager.launch en_sim:=true

#rember click start button
roslaunch manipulator_h_gazebo manipulator_h_gazebo.launch 

#rember click Set Mode button
rosrun manipulator_h_gui manipulator_h_gui  
```



