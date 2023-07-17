<template>

  <div id="input-bar">
    <n-input
      ref="inputInstRef"
      id="input"
      placeholder="输入消息"
      type="textarea"
      size="small"
      :autosize="{
        minRows: 1,
        maxRows: 5
      }"
      v-model:value="value"
      @keydown.enter.exact.prevent="keydownEnter"
      @keyup.enter="keyupEnter"
      :disabled="disabled"
    ></n-input>
    <n-button 
      id="button"
      @click="keydownEnter"
      :disabled="disabled"
    >
      Send
    </n-button>        
  </div>

</template>


<script setup lang="ts">
const MODULE_NAME = 'CInput'

import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

import { NInput, NButton, InputInst } from 'naive-ui'
import { postGroupMessages } from '@/functions/api';

const value = ref("")
const disabled = ref(false)
const inputInstRef = ref<InputInst | null>(null);

// let group: string


function keydownEnter() {
  console.log('keydownEnter', value.value)
  const message = value.value
  if (message.trim() === "") return
  const groupParam = route.params['group']  // seems well
  const group = Array.isArray(groupParam) ? groupParam[0] : groupParam
  disabled.value = true
  postGroupMessages(group, message)
  .then(()=>{
    value.value = ''
    disabled.value = false
    nextTick(inputInstRef.value?.focus)  // function name
  })
  .catch(()=>{
    disabled.value = false
    nextTick(inputInstRef.value?.focus)
  })
}
function keyupEnter() {
  // console.log("up" , value.value)
  // value.value = ''
}

onMounted(()=>{
  router.isReady()
  .then(()=>{
    console.log(MODULE_NAME, route.fullPath)
  })
})

</script>


<style>
#input-bar {
  text-align: left;
  /* background-color: cadetblue; */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  display: flex;

}

#input-bar #input {
  width: calc(100% - 60px);
}
#input-bar #button {
  width: 60px;
  position: fixed;
  bottom: 0;
  right: 0;
}

</style>