<template>
  <div class="ChatPage">
    <div class="ChatPage-Aside" :class="{ fold: uiOptions.aside.folder }">
      <div class="ChatPage-Aside-Fixed" />
      <div class="ChatPage-Aside-Title">
        <span>名词释义</span>
      </div>

      <div class="ChatPage-Aside-Main">
        <span>{{ uiOptions.aside.title }}</span>:
        <span v-html="uiOptions.aside.desc" />
      </div>
    </div>

    <div class="ChatPage-Main">
      <Chatml :arr="uiOptions.inputArr" :popover="handlePopover">
      </Chatml>

      <div class="ChatPage-Input">
        <el-input @keydown.enter="sendMsg" v-model="uiOptions.input" type="textarea" placeholder="Please input">
        </el-input>

        <FlatButton @click="sendMsg" class="ChatPage-Btn">
          发送
        </FlatButton>
      </div>

      <div class="ChatPage-Mark">
        <p>我的书签</p>
        <span>关于数据结构与算法分析的重点</span>
        <span>计算机网络知识导图</span>
        <span>操作系统实践</span>
      </div>
    </div>

    <div class="ChatPage-Packages">
      <div class="ChatPage-Packages-Title">
        <span>Components</span>
      </div>

      <div class="ChatPage-Packages-Main">
        <el-scrollbar>
          <div class="ChatPage-Packages-Main-Inner">
            <el-popover v-for="(item, index) in uiOptions.packages.arr" :key="index" placement="top-start" title="Title"
              :width="200" trigger="hover" content="this is content, this is content, this is content">
              <template #reference>
                <span class="ChatPage-Packages-Main-Inner-Item">
                  {{ item }}
                </span>
              </template>
            </el-popover>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResize } from '~/plugins/addon/auto-resizer'
import { ref, reactive, computed, onMounted } from 'vue'
import Chatml from '~/components/common/chat/Chatml.vue'
import FlatButton from '~/components/common/btn/FlatButton.vue'

function sendMsg() {
  if (!uiOptions.input) return

  _sendMsg(uiOptions.input)
  uiOptions.input = ''

  // get reply => ask server / axios
  replyMsg('我听不懂。')
}

function _sendMsg(text) {
  uiOptions.inputArr.push({
    right: true,
    content: text
  })
}

function replyMsg(text) {
  uiOptions.inputArr.push({
    content: text
  })
}

const uiOptions = reactive({
  input: '',
  inputArr: [
    {
      right: true,
      content: '你好，我想了解数据结构与算法分析中的Dijkstra算法，能否给我讲解一下？'
    },
    {
      content: '没问题，**数据结构与算法分析**中的**Dijkstra****算法**是........'
    }
  ],
  aside: {
    folder: true,
    width: 420,
    title: '',
    desc: ''
  },
  packages: {
    arr: [
      '数据结构与算法分析',
      '计算机网络',
      '操作系统',
      '编译原理',
      '计算机组成原理',
      '操作系统导论',
      '计算机网络导论',
      '编译原理导论',
      '计算机组成原理导论',
      'C Primer Plus',
      'C++ Primer Plus',
      'Java核心技术',
      '数据结构与算法分析',
      '计算机网络',
      '操作系统',
      '编译原理',
      '计算机组成原理',
      '操作系统导论',
      '计算机网络导论',
      '编译原理导论',
      '计算机组成原理导论',
      'C Primer Plus',
      'C++ Primer Plus',
      'Java核心技术',
      '数据结构与算法分析',
      '计算机网络',
      '操作系统',
      '编译原理',
      '计算机组成原理',
      '操作系统导论',
      '计算机网络导论',
      '编译原理导论',
      '计算机组成原理导论',
      'C Primer Plus',
      'C++ Primer Plus',
      'Java核心技术',
    ]
  }
})

function handlePopover(text) {
  uiOptions.aside.title = text
}

onMounted(() => {
  const asideDom = document.querySelector('.ChatPage-Aside')

  console.log(asideDom)

  useResize(asideDom, ({ x }) => {
    console.log(x)
    uiOptions.aside.width = x
  })
})

const asideWidth = computed(() => `${uiOptions.aside.width}px`)

function expandDetails(ele) {
  const rect = ele.getBoundingClientRect()

  const details = document.createElement('div')
  details.classList.add('ChatPage-Details')

  details.style.top = `${rect.top}px`
  details.style.left = `${rect.left - ele.clientHeight}px`

  document.body.appendChild(details)
}
</script>

<style lang="scss">
.ChatPage-Mark {
  span {
    padding: 4px 8px;
    margin-right: 12px;
    margin-top: 24px;

    border-radius: 12px;
    background-color: #e0e0e030;
  }

  p {
    position: absolute;

    top: -10px;
  }

  position: absolute;
  padding: 4px 10px;
  display: flex;

  align-items: center;

  width: 100%;
  height: 80px;

  left: 0;
  bottom: 0;

  box-sizing: border-box;
  border-top: 1px solid var(--el-border-color);
}

div.FlatButton-Wrapper.ChatPage-Btn {
  position: absolute;
  right: 1rem;
  bottom: 2rem;

  width: 80px;

  border-radius: 0;
}

.ChatPage-Input {

  .el-textarea,
  .el-textarea__inner {

    &:focus,
    &:hover {
      box-shadow: none;
    }

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border: none;
    border-radius: 0;

    box-shadow: none;
    background-color: transparent;
  }

  &:before {
    z-index: -1;
    content: "";
    position: absolute;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    opacity: .25;
    background-color: var(--el-bg-color);
  }

  z-index: 1;
  position: absolute;
  // padding: 8px 4px;
  bottom: 80px;
  left: 0;

  width: 100%;
  height: 20%;

  border-top: 1px solid var(--el-border-color);
  backdrop-filter: blur(18px) saturate(180%);
}

.ChatPage-Details {
  position: absolute;

  left: 0;
  top: 0;

  width: 100px;
  height: 200px;

  background-color: #00000050;
}

.ChatPage-Packages {
  z-index: 1;
  position: relative;
  // display: flex;
  // flex-direction: column;

  border-left: 1px solid var(--el-border-color);

  &-Main {
    &-Inner {
      &-Item {
        &:hover {
          filter: brightness(75%);
        }

        display: block;
        margin: 12px 0;
        padding: 4px 6px;

        min-width: 120px;
        text-align: center;

        cursor: pointer;
        color: var(--el-text-color-primary);
        border-radius: 6px;
        transition: .25s;
        background-color: #eeeeee20;
      }

      position: relative;
      padding: 0 14px;

      top: 40px;
    }

    width: 100%;
    height: 100%;
  }

  &-Title {
    &:before {
      z-index: -1;
      content: "";
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: .25;
      background-color: var(--el-bg-color);
    }

    z-index: 1;
    position: absolute;
    display: flex;
    padding: 10px 0;

    width: 100%;

    justify-content: center;
    align-items: center;

    text-align: center;

    backdrop-filter: blur(18px) saturate(180%);

    & span {
      font-size: 18px;
      font-weight: bold;

      color: var(--el-text-color-primary);
    }

  }

  max-width: 10%;
}

.ChatPage-Aside {
  &-Main {
    margin-top: 45px;
    padding: 6px 12px;

    box-sizing: border-box;
  }
  .ChatPage-Aside-Title {
    &:before {
      z-index: -1;
      content: "";
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: .25;
      background-color: var(--el-bg-color);
    }
    z-index: 1;
    position: absolute;
    display: flex;
    padding: 10px 0;

    width: 100%;

    justify-content: center;
    align-items: center;

    text-align: center;

    backdrop-filter: blur(18px) saturate(180%);

    & span {
      font-size: 18px;
      font-weight: bold;

      color: var(--el-text-color-primary);
    }
  }

  &.fold {}

  & h1 {
    text-align: center;
  }

  &-Fixed {
    &:hover {
      opacity: 1;

      width: 8px;
      cursor: col-resize;
    }

    z-index: 2;
    position: absolute;

    width: 1px;
    left: 100%;
    // left: v-bind(asideWidth);

    height: 100%;

    // opacity: .5;
    transition: .25s;
    // border: 1px solid var(--el-border-color);
    background-color: var(--el-border-color);
    transform: translateX(-50%);
  }

  position: relative;

  width: v-bind(asideWidth);
  height: 100%;

  background: var(--el-bg-color);
}

.ChatPage {
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;

  &-Main {
    position: relative;

    width: 100%;
    height: 100%;

  }
}
</style>