<template>
  <div class="ChatLine" :style="`--i: ${index * .125}s`" :class="{ right }">
    <div class="ChatLine-Avatar">
      <img :src="defaultAvatar" />
    </div>

    <div class="ChatLine-Content">
     <slot name="content" />
    </div>
  </div>
</template>

<script setup>
import defaultAvatar from '~/assets/static/avatar.png'
import { onMounted } from 'vue';

const emits = defineEmits(['init'])
const props = defineProps(['right', 'index'])

onMounted(() => {
  emits('init', () => {
    console.log('init')
  })
})
</script>

<style lang="scss">
.ChatLine {
  &.right {
    .ChatLine-Content {
      border-radius: 12px 0 12px 18px;
    }
    justify-content: right;
    flex-direction: row-reverse;

    animation: fadeInUpR .25s var(--i) ease-in-out forwards;
  }
  &:last-child {
    margin-bottom: 20%;
  }
  position: relative;
  margin: 1% 0;
  display: flex;

  min-height: 20px;

  opacity: 0;

  animation: fadeInUp .25s var(--i) ease-in-out forwards;
}

@keyframes fadeInUp {
  from {
    transform: translate(-100%);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }

}

@keyframes fadeInUpR {
  from {
    transform: translate(100%);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }

}

.ChatLine-Avatar {
  img {
    width: 48px;
    height: 48px;
  }
  padding: 10px 0;
  display: flex;

  justify-content: center;

  width: 5%;
  min-width: 80px;
}

.ChatLine-Content {
  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    width: 100%;
    height: 100%;

    left: 0;
    top: 0;

    opacity: 0.75;
    background-color: var(--el-bg-color);
  }
  z-index: 1;
  position: relative;
  padding: 8px 12px;

  width: auto;
  // min-width: 500px;

  height: auto;
  max-width: 35%;
  // min-height: 100px;

  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;

  color: var(--el-text-color-primary);
  overflow: hidden;
  border-radius: 0 12px 18px 12px;
}

</style>