<template>
  <div class="menu-container" ref="showContent">
    <div class="menu-bar-con">
      <button class="menu-bar-btn" @click="isOpenChange" v-bind:class="{'btn-active':isOpen}">
        <span class="icon">+</span>
      </button>
    </div>
    <ul class="menu-item-list">
      <MenuItem
          v-for="(item, itemIndex) in props.iconImgArr"
          :radius="props.radius"
          :index="itemIndex"
          :angleCur="props.startAngle + angleStep()*itemIndex"
          :animationDuration="props.animationDuration"
          :itemAnimationDelay="(itemIndex * props.itemAnimationDelay)"
          :icon="'icon-'+item.iconName"
          :showItem="showItem"
          :isOpen="isOpen"
          :total="props.iconImgArr.length"
          :currentIndex="currentIndex"
          v-on:showItemChange="showItemChange"
          v-on:isOpenChange="isOpenChange"
          v-on:animationCountIncrease=" (val) => {animationCountIncrease(val)}"
      >
      </MenuItem>
    </ul>
  </div>
</template>
<style lang="stylus" type="text/stylus">
.menu-container
  user-select none
  border-radius 50%
  transition box-shadow .28s cubic-bezier(.4, 0, .2, 1)
  box-shadow 0 2px 5px 0 rgba(0, 0, 0, .26)
  padding 0
  margin 0
  box-sizing border-box
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)

  .menu-bar-con
    .menu-bar-btn
      position absolute
      border-radius 50%
      width 50px
      height 50px
      z-index 1
      cursor pointer
      transition all .28s cubic-bezier(.4, 0, .2, 1)
      border none
      background-color #74a982
      color white
      outline none
      display flex
      align-items center
      justify-content center

      &.btn-active
        transform rotate(45deg)

      &:hover
        box-shadow 0 8px 17px 0 rgba(0, 0, 0, .2)

      .icon
        font-size 32px
        //line-height 60%
        position relative

  .menu-item-list
    list-style-type none
</style>
<script setup>
import MenuItem from './Item/item.vue'
import {onMounted, onUnmounted, ref} from "vue";

//接收父组件参数
const props = defineProps({
  iconImgArr: Array,
  startAngle: {
    default: 0
  },
  radius: {
    default: 100
  },
  itemAnimationDelay: {
    default: 0.04
  },
  animationDuration: {
    default: 0.5
  },
  endAngle: {
    default: 315
  },
  itemNum: {
    default: 8
  },
})

let showItem = ref(true);
let isOpen = ref(false);
let total = ref(props.iconImgArr.length);
let count = ref(0);
let currentIndex = ref(-1);


let angleStep = () => {
  return (props.endAngle - props.startAngle) / (props.itemNum - 1);
}

let getIconStyle = icon => {
  return '.icon-' + icon.iconName + '{' +
      'background-image: url(' + icon.iconUrl + ');' +
      'background-size: ' + icon.iconSize + '%; ' +
      '}\n'
}

let animationCountIncrease = val => {
  count.value++
  if (count.value === total.value) {
    isOpenChange()
    count.value = 0
  }
}

const emit = defineEmits(['selectItem'])
let showItemChange = index => {
  // isOpenChange()
  showItem.value = false
  currentIndex.value = index
  emit('selectItem', index);
}

let isOpenChange = () => {
  if (!isOpen.value && !showItem.value) {
    showItem.value = true
  }
  isOpen.value = !isOpen.value
}

const showContent = ref(null);
let cliFun = event => {
  let dom = showContent.value;
  if (!dom.contains(event.target)){
    if (showItem.value){
      showItem.value = true;
      isOpen.value = false;
    }
  }
}


onMounted(() => {
  let cssRule = ''
  props.iconImgArr.map((item) => {
    cssRule += getIconStyle(item)
  })
  let style = document.createElement('style')
  style.innerHTML = cssRule
  document.head.appendChild(style)
  document.addEventListener('click', cliFun)
})

onUnmounted(() => {
  document.removeEventListener('click', cliFun)
})
</script>
