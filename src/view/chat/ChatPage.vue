<template>
  <div class="ChatPage">
    <div class="ChatPage-Aside" :class="{ fold: uiOptions.aside.folder }">
      <div class="ChatPage-Aside-Fixed" />
      <div class="ChatPage-Aside-Title">
        <span>名词释义</span>
      </div>

      <div class="ChatPage-Aside-Main">
        <span style="font-weight: 600">{{ uiOptions.aside.title }}</span>:
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
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import Chatml from '~/components/common/chat/Chatml.vue'
import FlatButton from '~/components/common/btn/FlatButton.vue'

function sendMsg() {
  const text = uiOptions.input.trim()
  if (!text) return

  uiOptions.input = ''
  _sendMsg(text)

  if ( uiOptions.addon.do ) {

    if ( uiOptions.addon.nowKey ) {
      uiOptions.replyArr.push({
        content: text,
        key: uiOptions.addon.nowKey
      })

      uiOptions.addon.do = false
      uiOptions.addon.nowKey = ''

      localStorage.setItem('chatml', JSON.stringify(uiOptions.replyArr))

      return replyMsg('好的，我已为您完成添加！')
    }

    replyMsg('好的，请你说我需要回复什么！')

    uiOptions.addon.nowKey = text
    return
  }

  if ( text === 'addon' ) {
    uiOptions.addon.do = true

    return replyMsg('好的，现在请输入触发的关键字！')
  }

  ![...uiOptions.replyArr].forEach(item => {
    console.log(item.key, text)
    if ( item.key === text ) return replyMsg(item.content)
  })

  // get reply => ask server / axios
//   if (text === 'Dijkstra') 
//     replyMsg(`Dijkstra算法是一种用于寻找图中最短路径的著名算法，由荷兰计算机科学家艾兹格·迪杰斯特拉在1956年发明。该算法主要应用于有向图和无向图，可以处理带权重的边，但只处理非负权重的边。
// Dijkstra算法的基本步骤如下：
//       初始化：将源节点的距离设置为0，将所有其他节点的距离设置为无穷大。创建一个空的已访问节点集合。
//       对于未访问的**节点**，选择距离最小的节点，将其标记为已访问，并将其从未访问节点集合中删除。
//       对于该节点的每个相邻节点，如果该节点的距离比当前节点的距离小，则更新该节点的距离。
//       重复步骤2和3，直到所有节点都被访问，或者所有节点都无法到达**源节点**。
//       最后，Dijkstra算法将生成一个到每个节点的最短路径**树**。
//       需要注意的是，Dijkstra算法不能处理带有**负权重**的边。如果图中存在负权重的边，可以使用**Bellman - Ford**算法或**Floyd - Warshall**算法来处理。`);
//   else if (text === '等价小公式ln') {
//       replyMsg(`当 x→0 时， ln(1+ x)~x。和x-ln(1+x)~1/2x²
// ln 的等价无穷小公式是指当x趋近与0时，ln(1 + x)与x的关系。这个公式在微积分和数学分析中经常用到，可以用来简化函数的计算。例如，在**求解极限**、**微分**和**积分**时，可以将In(1 + x)近似为x, 从而简化计算步骤。需要注意的是, 在x趋近于0时, 等价无穷小公式才成立，因为在其他范围内，In(1 + x)与x的误差会变得很大, 不能简单地近似。
// 这是一个**泰勒级数**展开，表示x和ln(1 + x)在x趋近于0时的近似关系。泰勒级数是一种在数学中用于表示函数的一种方法，它将函数表示为无限级数的形式。在这种情况下，泰勒级数的形式是x - x / 2 + x ^ 3 / 3 - x ^ 4 / 4 + ...，这意味着x和ln(1 + x)在x趋近于0时的差的极限是1 / 2x ^ 2。
// 这个泰勒级数可以通过求解ln(1 + x)的泰勒级数来得到。首先，我们知道ln(1 + x)的泰勒级数的形式是x - x ^ 2 / 2 + x ^ 3 / 3 - x ^ 4 / 4 + ...，这意味着ln(1 + x)在x趋近于0时的极限是x。然后，我们可以将这个极限代入到我们想要证明的等式中，得到x - x + x ^ 3 / 3 - x ^ 4 / 4 + ... = x ^ 3 / 3 - x ^ 4 / 4 + ... = 1 / 2x ^ 2。
// 这个等式的证明可以通过数学归纳法来完成。首先，我们可以验证当x = 0时，等式成立。然后，假设当x = k时，等式成立，即x - x + x ^ 3 / 3 - x ^ 4 / 4 + ... = 1 / 2k ^ 2。然后，我们想要证明当x = k + 1时，等式也成立。根据泰勒级数的性质，我们可以将x = k + 1代入到x - x + x ^ 3 / 3 - x ^ 4 / 4 + ... = 1 / 2k ^ 2中，得到(k + 1) - (k + 1) + (k + 1) ^ 3 / 3 - (k + 1) ^ 4 / 4 + ... = 1 / 2(k + 1) ^ 2。然后，我们可以通过一些代数运算，将这个等式化简为k ^ 3 / 3 - k ^ 4 / 4 + ... = 1 / 2(k + 1) ^ 2，这正是我们想要证明的等式的形式。`)
//   } else replyMsg('我不知道你在说什么!')

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
  addon: {
    nowKey: '',
    do: false
  },
  input: '',
  inputArr: [
    {
      content: '你好，有什么可以帮助您的？'
    }
  ],
  replyArr: [],
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

const dicMap = {
  'Dijkstra': () => `Dijkstra算法是一种用于寻找图中最短路径的著名算法，由荷兰计算机科学家艾兹格·迪杰斯特拉在1956年发明。该算法主要应用于有向图和无向图，可以处理带权重的边，但只处理非负权重的边。

Dijkstra算法的基本步骤如下：

初始化：将源节点的距离设置为0，将所有其他节点的距离设置为无穷大。创建一个空的已访问节点集合。
对于未访问的节点，选择距离最小的节点，将其标记为已访问，并将其从未访问节点集合中删除。
对于该节点的每个相邻节点，如果该节点的距离比当前节点的距离小，则更新该节点的距离。
重复步骤2和3，直到所有节点都被访问，或者所有节点都无法到达源节点。
最后，Dijkstra算法将生成一个到每个节点的最短路径树。
需要注意的是，Dijkstra算法不能处理带有负权重的边。如果图中存在负权重的边，可以使用Bellman-Ford算法或Floyd-Warshall算法来处理。`,
  '1': "2"
}

function handlePopover(text) {
  uiOptions.aside.title = text

  const _t = dicMap[text]

  if ( _t ) {
    return uiOptions.aside.desc = _t.apply ? _t() : _t
  }

  if (text ==='求解极限') {
     uiOptions.aside.desc = ''
  }else if(text ==='Floyd-Warshall'){
      uiOptions.aside.desc = `Floyd-Warshall算法是解决任意两点间的最短路径的一种算法，可以正确处理有向图或负权的最短路径问题，同时也被用于计算有向图的传递闭包。其时间复杂度为O(N3)，空间复杂度为O(N2)`
  }
  else if(text ==='树'){
      uiOptions.aside.desc = `树是指最短路径树，它代表了从源节点到其他所有节点的最短路径。这个树是以源节点为根节点，其他节点为叶节点，每个节点的父节点到该节点的距离等于从源节点到该节点的最短距离。`
  }
  else if(text ==='节点'){
    uiOptions.aside.desc=`节点指的是图中的顶点。这些顶点可以代表各种事物，例如在地图中可能是城市，在网络中可能是节点或服务器，在社交网络中可能是个人或实体。算法的目标是从给定的起始节点（源节点）找到到达其他所有节点的最短路径。`
  }
  else if(text ==='源节点'){
    uiOptions.aside.desc=`源节点是Dijkstra算法中的起始节点，也是算法的起点。算法从源节点开始，逐步找到从源节点到图中所有其他节点的最短路径。`
  }
  else if (text === 'Bellman-Ford') {
    uiOptions.aside.desc = `Bellman-Ford算法是一种求解单源最短路径问题的算法，由理查德·贝尔曼和莱斯特·福特创立。它可以处理带有负权重的边，但是不能处理带有负权重环的图。算法的基本步骤是对图进行V-1次松弛操作，得到所有可能的最短路径。其优点是实现简单，缺点是时间复杂度过高，高达O(VE)，但可以通过一些优化来提高效率。`
   }
   
}

onMounted(() => {
  const asideDom = document.querySelector('.ChatPage-Aside')

  useResize(asideDom, ({ x }) => uiOptions.aside.width = x)

  // load
  const data = localStorage.getItem('chatml')
  if (data) uiOptions.replyArr = JSON.parse(data)
})

onBeforeUnmount(() => {
  localStorage.setItem('chatml', JSON.stringify(uiOptions.replyArr))
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
  z-index: 1;
  position: absolute;
  padding: 4px 10px;
  display: flex;

  align-items: center;

  width: 100%;
  height: 80px;

  left: 0;
  bottom: 0;

  box-sizing: border-box;
  backdrop-filter: blur(18px) saturate(180%);
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
      font-weight: 600;

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