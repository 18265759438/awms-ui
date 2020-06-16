<template>
  <el-container class="main-layout">
    <el-header class="main-layout-header">
      <div class="header-logo">
        <img alt="logo" src="../assets/header-logo.png" />
      </div>
      <div class="header-avatar">
        <el-dropdown>
          <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <div @click="logOut">
              <el-dropdown-item>注销</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside
        class="main-layout-aside"
        :width="sideBarWidth"
        :style="{ 'background-color': sideBarColor }"
      >
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="collapsed"
          :background-color="sideBarColor"
          text-color="#fff"
          router
        >
          <el-menu-item index="/monit">
            <i class="el-icon-sunny"></i>
            <span slot="title">环境监测</span>
          </el-menu-item>
          <el-menu-item index="/alarm">
            <i class="el-icon-message-solid"></i>
            <span slot="title">报警信息</span>
          </el-menu-item>
          <el-menu-item index="/manage">
            <i class="el-icon-s-tools"></i>
            <span slot="title">设备管理</span>
          </el-menu-item>
          <a
            target="_blank"
            href="http://192.168.1.168/doc/page/login.asp?_1591079848729"
            style="color:#fff;text-decoration:none"
          >
            <el-menu-item>
              <i class="el-icon-view"></i>
              <span slot="title">视频监控</span>
            </el-menu-item>
          </a>
        </el-menu>
        <div style="position:absolute;bottom:0px;width:inherit">
          <el-button plain type="text" style="width:100%" @click="handleSideBarCollapse">
            <span v-show="collapsed">&gt;&gt;</span>
            <span v-show="!collapsed">&lt;&lt; &nbsp;收起侧边栏</span>
          </el-button>
        </div>
      </el-aside>
      <el-main class="main-layout-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Main',
  components: {
    //
  },
  data() {
    return {
      collapsed: false,
      sideBarColor: '#606266',
      sideBarWidth: '200px'
    }
  },
  methods: {
    handleSideBarCollapse() {
      this.collapsed = !this.collapsed
      if (this.collapsed) {
        this.sideBarWidth = '65px'
      } else {
        this.sideBarWidth = '200px'
      }
    },
    sayHello() {
      //
    },
    logOut() {
      // 清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  created() {
    this.sayHello()
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.main-layout-header {
  background: #024fa7;
  background: -moz-linear-gradient(to right, #024fa7 0%, #2493fad2 100%);
  background: -webkit-linear-gradient(to right, #024fa7 0%, #2493fad2 100%);
  background: -ms-linear-gradient(to right, #024fa7 0%, #2493fad2 100%);
  background: linear-gradient(to right, #024fa7 0%, #2493fad2 100%);
}
.main-layout-content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.header-avatar {
  position: relative;
  top: 10px;
  float: right;
}
.header-logo {
  float: left;
}
</style>
