# hero-dashboard

[![CI](https://github.com/tue-robotics/hero-dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/tue-robotics/hero-dashboard/actions/workflows/main.yml)

Dashboard for HERO robot. It shows the status of the emergency button and the batteries.

## Build Setup

```bash
# install dependencies
npm install

# Compiles and hot-reloads for development
npm run dev

# Compiles and minifies for production
npm run build

# Run your unit tests
NO_FULLSCREEN=1 npm run test

# Lints and fixes files
npm run format
npm run lint
```

## Test hero dashboard

### Dependencies

#### ROS1

```bash
sudo apt-get install ros-${ROS_DISTRO}-rosbridge-server ros-${ROS_DISTRO}-rostopic
```

#### ROS2

```bash
sudo apt-get install ros-${ROS_DISTRO}-rosbridge-server ros-${ROS_DISTRO}-ros2topic
```

### Run

#### ROS1

```bash
# Launch rosbridge server
roslaunch rosbridge_server rosbridge_websocket.launch

# Launch example string publisher
rostopic pub /text_to_speech/output std_msgs/String -- "I am hero, an awesome robot!"
```

#### ROS2

```bash
# Launch rosbridge server
ros2 launch rosbridge_server rosbridge_websocket_launch.xml

# Launch example string publisher
ros2 topic pub /text_to_speech/output std_msgs/msg/String "data: 'I am hero, an awesome robot!'"
```

#### Start hero-dashboard

```bash
# Run hero-dashboard executable
NO_FULLSCREEN=1 ./dist_electron/hero-dashboard.AppImage
```

To connect to a different rosbridge webserver,
add the desired hostname or ip-address as final argument.

```bash
NO_FULLSCREEN=1 ./dist_electron/hero-dashboard.AppImage --host=other_machine.local
```
