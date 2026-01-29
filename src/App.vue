<template>
  <div id="app">
    <div class="row">
      <div class="col">
        <Indicator id="indicator" :ros="ros" />
      </div>
      <div class="col">
        <Battery id="battery" :ros="ros" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { markRaw, onMounted } from "vue";
  import { AutoRos } from "auto-ros";
  import { Battery, Indicator } from "hero-vue";

  const autoRos = new AutoRos();
  const ros = markRaw(autoRos.ros);
  const endPoint = "ws://localhost:9090";

  onMounted(async () => {
    const host = (await window?.args?.host()) || null;
    let url = endPoint;
    if (host) {
      url = `ws://${host}:9090`;
    }

    autoRos.connect(url);
  });
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    width: 375px;
    height: 60px;
    line-height: 1.15;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #indicator {
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #battery {
    position: fixed;
    top: 5px;
    left: 120px;
  }
  #battery .col {
    width: 120px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 0px;
    margin-right: 0px;
  }
  #battery .h5 {
    margin: 0px;
    font-size: 1rem;
    font: inherit;
  }
  #battery .progress {
    height: 1.5rem;
  }
  .row {
    display: inline-flex;
  }
</style>
