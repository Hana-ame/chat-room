<template>
  <n-list-item class="message">
    <n-thing :content-indented="true">
      <template #description>
        <n-space size="small" style="margin-top: 4px">
          <n-tag :bordered="true" type="info" size="small">
            {{ message.poster }}
          </n-tag>
          <n-tag :bordered="true" type="info" size="small">
            {{ timestampToDateTime(message.createdAt) }}
          </n-tag>
        </n-space>
      </template>
      <c-mkd :text="message.payload"></c-mkd>
    </n-thing>    
  </n-list-item>  
</template>


<script setup lang="ts">

import { NListItem, NThing, NSpace, NTag } from 'naive-ui'

import CMkd from '@/components/CMkd';
import { type Message } from '@/functions/api'


defineProps<{
  message: Message,
}>()

function timestampToDateTime(timestamp: number) {
  if (typeof timestamp === 'string')
    return ((time: any) => { return time.split(".")[0]})(timestamp) // tempory patch
  const date = new Date(timestamp*1000); // Create a Date object using the timestamp (in milliseconds)
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTimeString;
}


</script>


<style>
.message {
  text-align: left;
  background-color: RGBA(0,0,0,0);
}
.pre {
  /* white-space: pre; */
  overflow-wrap: break-word;
  word-wrap: break-word;
}

</style>