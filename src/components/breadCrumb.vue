<template>
  <el-card style="margin-bottom: 20px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ propsData }}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>

<script>
export default {
  name: 'breadCrumb',
  props: {
    propsData: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
