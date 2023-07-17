<template>
  <!-- {{ lastMsg }} -->
  <router-link :to="'/group/'+group">
    <div width="100%" style="text-align: right; 
  display: flex;
  justify-content: space-between; margin:20px">
      <span>{{ group }}</span>
      <span>
        {{ lastMsg?.poster }}
        {{ limitedText(lastMsg?.payload,20) }}
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { Message } from '@/functions/api';
import { Group } from '@/functions/utils';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  group: string
}>()

let thisGroup: Group
const lastMsg = ref<Message>()

function limitedText(text:string|undefined, limit:number) {
  if (!text) return
  if(text.length > limit) {
    return text.slice(0,limit) + '...'
  }
  return text
}

onMounted(() => {
  console.log("M",props.group)
  thisGroup = Group.record[props.group] ?? new Group(props.group)
  lastMsg.value=thisGroup.messages[thisGroup.messages.length-1]
  thisGroup.receivedCallback.set("menu", () => {
    console.log(thisGroup.messages[thisGroup.messages.length-1])
    lastMsg.value=thisGroup.messages[thisGroup.messages.length-1]
  })
  
})

onBeforeUnmount(() => {
  console.log("UM",props.group)
  thisGroup.receivedCallback.delete("menu")
})

</script>