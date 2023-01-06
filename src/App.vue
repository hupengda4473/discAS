<script setup>
</script>

<template>
  <div class="header">
    <ul>
      <li class="routerItem">
        <router-link to="/Center" style="color:white">center</router-link>
      </li>
      <li class="routerItem">
        <router-link to="/BottomLeft" style="color:white">corner</router-link>
      </li>
      <li class="routerItem">
        <router-link to="/BottomRight" style="color:white">右下角</router-link>
      </li>
    </ul>

  </div>
  <router-view></router-view>
</template>

<style lang="stylus" type="text/stylus">
.header
  width: 100%
  margin-top: 200px
  display: flex
  justify-content: center
  align-items: center
  .routerItem
    display: inline-block
    height: 30px
    width: 50px
    line-height: 30px
    font-size: 15px
    border-radius: 10px
    text-align: center
    background-color: #6b9eb8


</style>
