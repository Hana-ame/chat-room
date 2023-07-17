<template>
  <n-config-provider :theme="darkTheme">

    <c-menu></c-menu>
    
    <router-link to="/group/1"><button>点这里进测试</button></router-link>

    <router-view />    
    
  </n-config-provider>
</template>

<script setup lang="ts">
const MODULE_NAME = 'App'
import CMenu from '@/components/CMenu.vue'

import { onMounted, onUpdated } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { NConfigProvider, darkTheme } from 'naive-ui'


onMounted(() => {
  console.log(MODULE_NAME, 'onMounted')
  console.log(route.fullPath)
  router.isReady()
  .then(()=>{
    console.log(route.fullPath)
  })
  
})

// change router view do not trigger this.
onUpdated(() => {
  console.log(MODULE_NAME, 'onUpdated')
  // console.log(route.fullPath)
  router.isReady()
  .then(()=>{
    // console.log(route.fullPath)
  })  
})

</script>

<style>
#app {
  width: 100%;
  padding: 0;
}
</style>