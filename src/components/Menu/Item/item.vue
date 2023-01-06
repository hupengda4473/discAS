<template>
  <li class="item" ref="item" :style="styleArr" @click="changeShowItem">
    <transition :name="props.currentIndex === props.index?'item-selected':'item-not-selected'">
      <div class="item-wrapper" v-show="props.showItem" @animationend="animationEnd">
        <button class="item-btn" :class="[props.icon]"></button>
      </div>
    </transition>
  </li>

</template>

<style lang="stylus" type="text/stylus">
@import "../../../common/stylus/menuConfig.styl"
.item
  opacity 1
  position absolute
  bottom 5px
  left 5px
  transition transform .28s cubic-bezier(.4, 0, .2, 1), box-shadow .28s cubic-bezier(.4, 0, .2, 1), opacity .28s cubic-bezier(.4, 0, .2, 1)
  width 40px
  height 40px
  border-radius 50%

  .item-wrapper
    width 100%
    height 100%
    background-color #d8dde0
    border-radius 50%

    .item-btn
      cursor pointer
      border-radius 50%
      border none
      background-color transparent
      width 100%
      height 100%
      box-shadow 0 2px 5px 0 rgba(0, 0, 0, .26)
      transition box-shadow .28s cubic-bezier(.4, 0, .2, 1),transform ease-in 0.1s, background-color ease-in 0.1s, box-shadow ease-in 0.25s
      position: relative;
      opacity .28s cubic-bezier(.4, 0, .2, 1)
      background-position center center
      background-repeat no-repeat
      /*opacity 0.8*/
      outline none

      &:hover
        box-shadow 0 8px 17px 0 rgba(0, 0, 0, .2)

      /*&::before
        position absolute
        content ''
        left -1em
        right -1em
        top -1em
        bottom -1em
        pointer-events none
        background-repeat no-repeat
        background-image radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%),
        radial-gradient(circle, #d8dde0 20%, transparent 20%)
        background-position 5% 0%, -5% 0%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%, 100% -2%, -5% 80%,100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%, 100% 100%
        background-size: 0 0;
        transition background-position .5s ease-in-out, background-size .75s ease-in-out

      &:active::before
        transition 0s
        background-size  10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%,15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%
        background-position 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%*/

.item-selected-leave-active
  animation-name select-item
  animation-duration animationDuriation
  animation-fill-mode forwards

.item-not-selected-leave-active
  animation-name not-select-item
  animation-duration animationDuriation
  animation-fill-mode backwards

@keyframes select-item {
  0% {
    transform scale(1)
    opacity 1
  }
  100% {
    transform scale(2)
    opacity 0
  }
}

@keyframes not-select-item {
  0% {
    transform scale(1)
    opacity 1
  }
  100% {
    transform scale(0.5)
    opacity 0
  }
}


</style>
<script setup>
import {onMounted, reactive, ref, watch} from "vue";

let props = defineProps({
  radius: Number,
  angleCur: Number,
  index: Number,
  animationDuration: Number,
  itemAnimationDelay: Number,
  icon: String,
  showItem: Boolean,
  isOpen: Boolean,
  total: Number,
  currentIndex: Number
})
let styleArr = ref([]);
let itemExpandAnimationStyle = reactive({
  animationName: 'expand-item-' + props.index,
  animationFillMode: 'forwards',
  animationDuration: +props.animationDuration + 's',
  animationDelay: props.itemAnimationDelay + 's',
  animationTimingFunction: 'ease-in'
})
let itemContractAnimationStyle = reactive({
  animationName: 'contract-item-' + props.index,
  animationFillMode: 'backwards',
  animationDuration: +props.animationDuration + 's',
  animationDelay: props.itemAnimationDelay + 's',
  animationTimingFunction: 'ease-out'
})

let x = () => {
  return props.radius * Math.cos(toRadians(props.angleCur))
}
let y = () => {
  return props.radius * Math.sin(toRadians(props.angleCur))
}
let x0 = () => {
  return 0
}
let y0 = () => {
  return 0
}
let x2 = () => {
  return Number((x()).toFixed(2))
}
let y2 = () => {
  return Number((y()).toFixed(2))
}
let x1 = () => {
  return x2() * 1.2
}
let y1 = () => {
  return y2() * 1.2
}

watch(props, () => {
  if (props.isOpen) {
    try {
      styleArr.value.pop()
    } catch (e) {
      console.log(e)
    }
    styleArr.value.push(itemExpandAnimationStyle)
  } else {
    styleArr.value.pop()
    styleArr.value.push(itemContractAnimationStyle)
  }
})

const emit = defineEmits(['animationCountIncrease', 'showItemChange'])
let animationEnd = () => {
  emit('animationCountIncrease')
}
let changeShowItem = () => {
  setTimeout(()=>{
    emit('showItemChange', props.index)
  },200);
}

let toRadians = angle => {
  return angle * (Math.PI / 180)
}
let generateBaseKeyFrame = stage => {
  let str
  if (stage === 'expand-item-') {
    str = stage + props.index + '{' +
        '0% {' +
        'transform: translate(' + x0() + 'px,' + y0() + 'px)' +
        '}' +
        '70% {' +
        'transform: translate(' + x1() + 'px,' + y1() + 'px)' +
        '}' +
        '100% {' +
        'transform: translate(' + x2() + 'px,' + y2() + 'px)' +
        '}' +
        '}\n'
  } else {
    str = stage + props.index + '{' +
        '100% {' +
        'transform: translate(' + x0() + 'px,' + y0() + 'px)' +
        '}' +
        '0% {' +
        'transform: translate(' + x2() + 'px,' + y2() + 'px)' +
        '}' +
        '}\n'
  }
  return '@keyframes ' + str + '@-webkit-keyframes   ' + str

}
let getAnimateDetail = () => {
  return '.item-active {' +
      'animation-name: ' + 'expand-item-' + props.index + ';' +
      'animation-fill-mode: forwards;' +
      'animation-duration: 0.7s;' +
      'animation-timing-function: ease-out' +
      '}\n'
}
let insertStyleSheet = () => {
  let cssRule = generateBaseKeyFrame('expand-item-')
  cssRule += generateBaseKeyFrame('contract-item-')
  cssRule += getAnimateDetail()
  let style = document.createElement('style')
  style.innerHTML = cssRule
  document.head.appendChild(style)

}

onMounted(() => {
  insertStyleSheet()
})

</script>
