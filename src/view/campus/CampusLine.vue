<template>
  <div class="CampusLine" :class="{ focus }">
    <slot name="addon"/>
    <div>
    |||||
      <slot name="test">
        你好
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['focus'])
</script>

<style lang="scss">
.CampusLine {
  &.focus {
    height: 200px;

    background-color: red;
  }
  position: relative;
  margin-bottom: 4rem;

  width: 100%;
  height: 120px;

  color: red;
  font-weight: 600;
  font-size: 20px;

  background-color: #eee;
  transition: .25s;
}
</style>
