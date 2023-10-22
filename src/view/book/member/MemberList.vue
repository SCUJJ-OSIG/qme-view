<!--
  - Copyright (c) 2022. TalexDreamSoul
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <div>
    <el-table :data="props.members" stripe row-class-name="MemberList-list">
      <el-table-column prop="avatar" label="用户">
        <template #default="scope">
          <div class="user">
            <img v-if="scope.row?.user?.avatar" :src="scope.row?.user?.avatar" alt="" />
            <img v-else :src="Avatar" class="corner"  alt=""/>
            <p class="username">
              {{ scope.row.user.username }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="permission" label="成员权限">
        <template #default="scope">
          <!--            <span v-if="scope.row.permission === 3">超级管理员</span>-->
          <span v-if="scope.row.permission === 2">成员</span>
          <span v-if="scope.row.permission === 1">管理员</span>
          <span v-if="scope.row.permission === 0">超级管理员</span>
          <!--            <span v-if="scope.row.permission < 0">黑名单</span>-->
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="加入时间">
        <template #default="scope">
          {{ formatDateDistance(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="275">
        <template #header>
          <!--          <talex-drop-down hover-trigger>-->
          <!--            <template #display>-->
          <!--              <el-button :icon="Plus" text plain class="rounder-btn primary stretch-center" size="small" type="primary">添加成员</el-button>-->
          <!--            </template>-->
          <!--            <user-searcher />-->
          <!--            <el-button type="primary">添加成员</el-button>-->
          <!--          </talex-drop-down>-->
          <el-popover
                  placement="bottom"
                  :width="200"
                  trigger="click"
          >
            <template #reference>
              <el-button :icon="Plus" text plain class="rounder-btn primary stretch-center" size="small" type="primary">
                添加成员
              </el-button>
            </template>
            <user-searcher @select="handleSearcherSelected"/>
          </el-popover>
        </template>
        <template #default="scope">
          <!--            <el-button plain size="small" type="primary" @click="handleSetting(scope.row.id)">编辑</el-button>-->
          <!--            @click="handleDelete(scope.row.id)"-->
          <!--            v-permission="{ permission: '删除成员', type: 'disabled' }"-->
          <el-button plain size="small" type="primary">编辑</el-button>
          <el-button plain size="small" type="danger" :disabled="scope.row.permission === 0">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { formatDateDistance } from '~/plugins/addon/utils'

import Avatar from '~/assets/static/avatar.png'
import UserSearcher from '~/components/common/input/UserSearcher.vue'

const emits = defineEmits( [ 'select' ] )
const props = defineProps( {
  members: {
    type: Array
  }
} )

const loading = ref( false )

function handleSearcherSelected( item ) {
  emits( 'select', item )
}

</script>

<style lang="scss" scoped>
.MemberList-list {
  .user {
    position: relative;
    display: flex;

    top: 10px;
  }
  img {
    margin-bottom: 5px;
    width: 48px;
    height: 48px;
  }
  .username {
    position: relative;
    padding: 2px 8px;
    display: flex;

    top: 50%;
    left: 5px;

    height: 30px;
    line-height: 45px;
    width: max-content;

    font-size: 17px;
    text-align: center;
    transform: translateY(-50%);
  }
}

.MemberList-Wrapper {
  position: relative;
  padding: 1% 2%;

  background-color: red;
}

.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      //color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
