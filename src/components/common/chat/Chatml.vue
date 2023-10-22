<template>
  <div class="ChatmlPage">
    <el-scrollbar>
      <div class="ChatPage-Inner">
        <ChatLine :right="item.right" :index="index" @init="handleInit" v-for="(item, index) in arr">
          <template #content>
            <span v-html="genRichContent(item.content)" />
          </template>
        </ChatLine>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import ChatLine from './ChatLine.vue';

const props = defineProps({
  popover: Function,
  arr: Array
})

function whenClick(event) {
  const { target } = event

  if (target.classList.contains('clickable')) {
    props.popover(target.innerText)
  }
}

onMounted(() => {
  // generate random text for chat
  // for (let i = 0; i < 20; i++) {
  //   arr.value.push({
  //     right: Math.random() > .5,
  //     content: ('0000' + Math.random().toString(36)).substr(6)
  //   })
  // }

  document.body.addEventListener('click', whenClick)
})

onBeforeMount(() => {
  document.body.removeEventListener('click', whenClick)
})

function genRichContent(content) {

  // match regex ** xxx **
  content = content.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
    return `<span class="ChatLine-Content-Strong clickable">${p1}</span>`
  })

  return content
}

</script>

<style lang="scss">
.ChatLine-Content-Strong {
  &:hover::before {
    transform: translateY(0) scaleX(1);
  }
  &:before {
    content: "";
    position: absolute;

    width: 100%;
    height: 2px;

    bottom: -2px;

    transform: translateY(2px) scaleX(0);

    transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) .25s;
    background-color: var(--el-color-primary);
  }
  position: relative;

  // padding: 0 2px;
  font-weight: 600;
  cursor: pointer;

  color: var(--el-color-warning-light-5);

  filter: invert(15%) brightness(150%);
}

.ChatPage-Inner {
  padding: 0 2rem;
}

.ChatmlPage {
  position: relative;

  width: 100%;
  height: 100%;
}
</style>