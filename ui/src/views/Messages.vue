<template>

  {{ route.fullPath }}
  <div style="height: 100%;">
    <n-list id="messages">
      <c-message v-for="message in messages" :key="message.id" :message="message"></c-message>
      <n-list-item>
        <div id="message-end" style="height: 30px"></div>
      </n-list-item>
    </n-list>
    <c-input></c-input>
  </div>
</template>

<script setup lang="ts">
const MODULE_NAME = "Messages"

import CInput from '@/components/CInput.vue'
import CMessage from '@/components/CMessage.vue';

import { NList, NListItem } from 'naive-ui'

import { Title, Group } from '@/functions/utils'
import { type Message } from '@/functions/api'
import { nextTick, onBeforeUpdate, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

// const messages = ref<Message[]>([])
// let earliestMsgID = -1
// let latestMsgID = -1
let prevGroup = ""

let eEl : HTMLElement | null // the end of messages

// const thisGroup = ref<Group>()
let thisGroup : Group

// const messages = computed(() => {
//   return thisGroup?.messages.value
// })
const messages = ref<Message[]>([])

function scrollToEnd() {
  if (windowFocused && eEl) {
    eEl.scrollIntoView({behavior: 'smooth'});
  }
}

let windowFocused = true; // focus will not trigger first
function windowFocus() {
  windowFocused = true
  Title.clearCnt()
}
function windowBlur() {
  windowFocused = false
}
function receivedNMessages(n: number) {
  if (!windowFocused)
  Title.addCnt(n)
}

onMounted(() => {
  console.log(MODULE_NAME, 'onMounted')
  window.addEventListener('focus', windowFocus);
  window.addEventListener('blur', windowBlur);

  router.isReady()
  .then(()=>{
    console.log(route.fullPath)
    const groupParam = route.params['group']  // seems well
    const group = Array.isArray(groupParam) ? groupParam[0] : groupParam
    Title.setTitle(group + " - moonchat")

    // new group instant or get one
    thisGroup = Group.record[group] ?? new Group(group)
    messages.value=thisGroup.messages
    nextTick(scrollToEnd)
    thisGroup.receivedCallback.set("pannel", (ms: Message[]) => receivedNMessages(ms.length))
    thisGroup.receivedCallback.set("message", () => messages.value=thisGroup.messages)
    thisGroup.nextTickCallback.set("pannel", scrollToEnd)

    // console.log(thisGroup, messages)

    prevGroup = group // no need for prevGroup
  })

  eEl = document.getElementById("message-end")
})

// trigger by changing route
onBeforeUpdate(async () => {
  const PHASE = 'onBeforeUpdate'
  console.log(MODULE_NAME, PHASE)
  console.log(PHASE, route.fullPath)
  // get group
  const groupParam = route.params['group']  // seems well
  const group = Array.isArray(groupParam) ? groupParam[0] : groupParam
  // prev group
  if (prevGroup !== group) {
    // do this only when the group is changed
    
    // switch to antoher group
    Title.setTitle(group + " - moonchat")
    thisGroup?.receivedCallback.delete("pannel")
    thisGroup?.receivedCallback.delete("message")
    thisGroup?.nextTickCallback.delete("pannel")
    thisGroup = Group.record[group] ?? new Group(group)
    messages.value=thisGroup.messages
    nextTick(scrollToEnd)
    thisGroup.receivedCallback.set("pannel", (ms: Message[]) => receivedNMessages(ms.length))
    thisGroup.receivedCallback.set("message", () => messages.value=thisGroup.messages)
    thisGroup.nextTickCallback.set("pannel", scrollToEnd)

    // console.log(thisGroup, messages)

    prevGroup = group // no need for prevGroup
  }    

})


onUnmounted(() => {
  window.removeEventListener('focus', windowFocus);
  window.removeEventListener('blur', windowBlur);

})

</script>