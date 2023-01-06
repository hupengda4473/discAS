<template>
  <BloomMenu
      :iconImgArr="iconImgArr()"
      @selectItem = "selectItem"
      class="menu-center-wrapper"
      radius="100"
  >
    <!--可配置参数,默认有缺省值-->
    <!--:radius="radius" default为100px,item距离menu的button的距离-->
    <!--:startAngle="startAngle" defaut为0，item开始的角度，以时钟3点钟方向记为0，然后顺时针方向为递增方向-->
    <!--:endAngle="endAngle" default为315，最后一个item的角度-->
    <!--:itemNum="itemNum" default为8,item个数-->
    <!--:animationDuration="animationDuration"  default为0.5s，每个item动画的执行时间-->
    <!--:itemAnimationDelay="itemAnimationDelay"  default为0.04s,每个item之间animation触发的间隔延迟时间-->
  </BloomMenu>
</template>

<script setup>
import BloomMenu from '../components/Menu/menu.vue'
// 图片的icon
import house from '../common/icon/house.svg'
import datas from '../common/icon/data.svg'
import info from '../common/icon/info.svg'
import money from '../common/icon/money.svg'
import phone from '../common/icon/phone.svg'
import user from '../common/icon/user.svg'
import card from '../common/icon/card.svg'
import liuyangtiao from '../common/icon/liuyangtiao.svg'

//整理图标arr
let iconImgArr = () => {
  let tmp = []
  // 分别指定图标,名称， 以及background-size属性
  tmp.push(getIconObj(house, 'house'))
  tmp.push(getIconObj(datas, 'datas'))
  tmp.push(getIconObj(info, 'info'))
  tmp.push(getIconObj(money, 'money'))
  tmp.push(getIconObj(phone, 'phone'))
  tmp.push(getIconObj(user, 'user'))
  tmp.push(getIconObj(card, 'card'))
  tmp.push(getIconObj(liuyangtiao, 'liuyangtiao'))
  return tmp
};

//格式化图标obj
let getIconObj = (url, name, size = 50) => {
  let tmp = {}
  tmp.iconUrl = url
  tmp.iconName = name
  tmp.iconSize = size
  return tmp
}

//选择item
let selectItem = item => {
  console.log(item);
}
</script>

<style lang="stylus" type="text/stylus">
@import "../common/stylus/menuConfig.styl"
</style>
