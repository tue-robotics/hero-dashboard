# hero-dashboard

[![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-image-dev]][daviddm-url-dev] [![optionalDependencies Status][daviddm-image-optional]][daviddm-url-optional]

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

---

[travis-image]: https://travis-ci.com/tue-robotics/hero-dashboard.svg?branch=master
[travis-url]: https://travis-ci.com/tue-robotics/hero-dashboard

[daviddm-image]: https://david-dm.org/tue-robotics/hero-dashboard/status.svg
[daviddm-url]: https://david-dm.org/tue-robotics/hero-dashboard
[daviddm-image-dev]: https://david-dm.org/tue-robotics/hero-dashboard/dev-status.svg
[daviddm-url-dev]: https://david-dm.org/tue-robotics/hero-dashboard?type=dev
[daviddm-image-optional]: https://david-dm.org/tue-robotics/hero-dashboard/optional-status.svg
[daviddm-url-optional]: https://david-dm.org/tue-robotics/hero-dashboard?type=optional
