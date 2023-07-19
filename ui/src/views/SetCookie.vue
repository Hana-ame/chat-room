<template>

</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

onMounted(() => {
  router.isReady()
  .then(()=>{
    console.log(route.query)
    const user = route.query['user']
    const pass = route.query['pass']
    document.cookie = `user=${user}; path=/`
    document.cookie = `pass=${pass}; path=/`
    document.location.href = `/group/1`
  })
})


</script>