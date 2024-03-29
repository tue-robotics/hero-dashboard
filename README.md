# hero-dashboard

[![CI](https://github.com/tue-robotics/hero-dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/tue-robotics/hero-dashboard/actions/workflows/main.yml)

Dashboard for HERO robot. It shows the status of the emergency button and the batteries.

## Build Setup

```bash
# install dependencies
npm install

# Compiles and hot-reloads for development
npm run electron:serve

# Compiles and minifies for production
npm run electron:build

# Run your unit tests
NO_FULLSCREEN=1 npm run test:unit

# Lints and fixes files
npm run lint
```

## Test hero-dashboard

### Dependencies

```bash
sudo apt-get install ros-$ROS_DISTRO-rosbridge-server ros-$ROS_DISTRO-rostopic
```

### Run

```bash
# Launch rosbridge server
roslaunch rosbridge_server rosbridge_websocket.launch

# Publish example emergency button
rostopic pub /runstop_button std_msgs/Bool -- "false"

# Run hero-dashboard executable
./dist_electron/hero-dashboard.AppImage
```

To connect to a different rosbridge webserver,
add the desired hostname or ip-address as final argument.
