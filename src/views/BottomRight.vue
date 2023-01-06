<style lang="stylus" type="text/stylus">
@import "../common/stylus/menuConfig.styl"
</style>
<template>
  <div>
    <BloomMenu
        :iconImgArr="iconImgArr()"
        @selectItem = "selectItem"
        :startAngle="-180"
        :endAngle="-90"
        :itemNum="4"
        class="menu-right-corner-wrapper"
    >
      <!--可配置参数,默认有缺省值-->
      <!--:radius="radius" default为100px,item距离menu的button的距离-->
      <!--:startAngle="startAngle" defaut为0，item开始的角度，以时钟3点钟方向记为0，然后顺时针方向为递增方向-->
      <!--:endAngle="endAngle" default为315，最后一个item的角度-->
      <!--:itemNum="itemNum" default为8,item个数-->
      <!--:animationDuration="animationDuration"  default为0.5s，每个item动画的执行时间-->
      <!--:itemAnimationDelay="itemAnimationDelay"  default为0.04s,每个item之间animation触发的间隔延迟时间-->
    </BloomMenu>
  </div>

</template>

<script setup>
import BloomMenu from '../components/Menu/menu.vue'
// 图片的icon
import house from '../common/icon/house.svg'
import datas from '../common/icon/data.svg'
import info from '../common/icon/info.svg'
import money from '../common/icon/money.svg'

let iconImgArr = () => {
  let tmp = []
  tmp.push(getIconObj(house, 'house', '50'))
  tmp.push(getIconObj(datas, 'datas', '50'))
  tmp.push(getIconObj(info, 'info', '50'))
  tmp.push(getIconObj(money, 'money', '50'))
  return tmp
}

let getIconObj = (url, name, size = 50) => {
  let tmp = {}
  tmp.iconUrl = url
  tmp.iconName = name
  tmp.iconSize = size
  return tmp
}

//选择item
let selectItem = item => {
  console.log(item)
}
</script>
