<template>
  <div id="app">
    <keep-alive exclude="NotFound">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
