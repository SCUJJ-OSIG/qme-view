<template>
  <div class="CampusGroup">
    <div class="CampusGroup-Aside" :class="{ hide: uiOptions.left }">
      <TFSelector router-mode vertical>
        <TFSelectorItem to="/about/protocol" vertical title="生活"></TFSelectorItem>
        <TFSelectorItem to="/about/protocol" vertical title="学习"></TFSelectorItem>
        <TFSelectorItem to="/about/protocol" vertical title="咨询"></TFSelectorItem>
        <TFSelectorItem to="/about/protocol" vertical title="吃瓜"></TFSelectorItem>
      </TFSelector>
    </div>

    <div class="CampusGroup-Main">
      <el-scrollbar @scroll="handleScroll">
        <div class="CampusGroup-Main-Wrapper">
          <CampusLine :class="`CampusGroup-Line-${i}`" :focus="i === uiOptions.focus" v-for="i in uiOptions.arr">
            <template #test>
              dasjkljdlakslks
            </template>

            <template #addon>
              HELLO
            </template>
          </CampusLine>
        </div>
      </el-scrollbar>
    </div>

    <div class="CampusGroup-Extra right" :class="{ hide: uiOptions.right }">
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeMount } from 'vue'
import CampusLine from './CampusLine.vue'
import TFSelector from '@components/common/selector/TFSelector.vue'
import TFSelectorItem from '@components/common/selector/TFSelectorItem.vue'

const uiOptions = reactive({
  left: false,
  right: false,
  focus: 0,
  arr: 10
})


function handleScroll(event) {
  const { scrollTop } = event

  console.log("===========================")

  const parent = document.querySelector('.CampusGroup-Main-Wrapper')

  let _has = false

  ![...parent.children].forEach((item, index) => {
    if (_has) return
    const { top, bottom } = item.getBoundingClientRect()

    if (top > item.clientHeight + 50) {
      uiOptions.focus = index
      console.log('hit', item, uiOptions)
      _has = true
    }
  })
}

function keyListener(event) {
  const { key } = event

  if (key === 'ArrowLeft') {

    if (!uiOptions.left) {
      return uiOptions.left = true
    }

    if (uiOptions.right) {
      return uiOptions.right = false
    }

  } else if (key === 'ArrowRight') {

    if (uiOptions.left) {
      return uiOptions.left = false
    }

    if (!uiOptions.right) {
      return uiOptions.right = true
    }

  } else if (key === 'ArrowUp') {

    uiOptions.focus = Math.max(0, uiOptions.focus - 1)

  } else if (key === 'ArrowDown') {

    uiOptions.focus = Math.min(uiOptions.arr, uiOptions.focus + 1)

  }

  const ele = document.querySelector('.CampusGroup-Line-' + uiOptions.focus)

  if (ele) {

    ele.scrollIntoView({
      block: "center"
    })

  }
}

onMounted(() => {
  // init functions

  document.addEventListener('keydown', keyListener)

  const parent = document.querySelector('CampusGroup-Main-Wrapper')

})

onBeforeMount(() => {
  document.removeEventListener('keydown', keyListener)
})

</script>

<style lang="scss">
.CampusGroup {
  & div.hide {
    opacity: 0;
    transform: translateX(-100%);
  }

  & div.hide.right {
    transform: translateX(100%);
  }

  &-Aside {
    position: relative;
    top: 0;
    left: 0;
    width: 15%;
    height: 100%;
    background-color: var(--el-bg-color);
    // border-right: 1px solid #ebebeb;
  }

  &-Main {
    &-Wrapper {
      display: flex;
      padding: 1rem 2rem;

      flex-direction: column;
      justify-content: center;
    }

    position: relative;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #ebebeb;
  }

  &-Extra {
    position: relative;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    background-color: #fff;
  }

  position: relative;
  display: flex;

  justify-content: center;
  gap: 2rem;

  left: 15%;

  width: 70%;
  height: 100%;

}
</style>
