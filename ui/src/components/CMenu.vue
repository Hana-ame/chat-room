<template>

  <div id="menu">
    <span id="menu-drawer" @click="activate"><button>菜单</button></span>
    <n-drawer v-model:show="active" width="auto" placement="left">
      <n-drawer-content title="选择频道" closable>
        <c-ga v-for="group in groups" :key="group" :group="group"></c-ga>
      </n-drawer-content>
    </n-drawer>
    <span id="menu-id"><button @click="fetchNewUser">ID: {{ username ? username : "undefined"}}</button></span>    
  </div>

</template>

<script setup lang="ts">
const MODULE_NAME = 'CMenu'
import CGa from '@/components/CGa.vue'

import { onMounted, ref } from 'vue';
import { fetchWitchPath } from '@/functions/api'
import { getCookie } from '@/functions/utils';
import { NDrawer, NDrawerContent } from 'naive-ui';

const active = ref(false)
const groups = ref(["1","2","3"])

function activate() {
  active.value = true
}

const username = ref<string>()

function fetchNewUser() {
  fetchWitchPath("/user/new")
  .then(()=>{
    username.value = getCookie("user") ?? "undefined"
  })
  .catch(()=>{
    username.value = getCookie("user") ?? "undefined"
  })
}

onMounted(() => {
  console.log(MODULE_NAME, 'onMounted')
  const user = getCookie("user")
  console.log(user)
  if (user === null || user === "") {
    // debug seems well
    // console.log(user, "null or ")
    // window.location.href = API+'/user/new'
    fetchNewUser()
  } else {
    username.value = user
  }
})

</script>

<style>
#menu {
  position: fixed;
  top: 0;
  width: 100%;
  /* background-color: #000000; */
  /* 其他样式属性 */
  z-index: 10;

  display: flex;
  justify-content: space-between;
}

#menu-id {
  position: relative;

  display: inline-flex;
  align-items: center; /* 垂直居中 */

  text-align: right;
  /* background-color: #000000; */
}

</style>