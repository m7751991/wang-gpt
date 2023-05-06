<template>
<div class="fd-window-box">
   <div class="fd-window-box__context">
    请问有什么可以帮您？
    <template v-for="(item,index) in form.context"  :key="index">
      <div style="white-space: pre-wrap;">
        {{ item }}
      </div>
    </template>
      
    </div>
   <div class="fd-window-box__input">
     <el-input placeholder="请输入内容,按回车确认" v-model="form.options"   @keyup.enter="onEnter" />
   </div>
</div>
</template>


<script setup>
import { ElLoading } from 'element-plus'
 const config = {
    organization: 'org-3f09XtCUjvIwyefCFdXqUoTg',
    apiKey: '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',
  }
  const options = {
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['input:'],
  }

import { reactive } from 'vue'
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://156.236.73.178:3005'
})

const form = reactive({
  information:'',
  context:''
})

const sendFormData = () => {
  const lodaing = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',})
  const data = { options: {...options,prompt:form.options},config };
  instance.post("/api/createCompletion", data)
    .then(response => {
      const {choices} = response.data.data;
      form.context = choices.map(item=>{
      return item.text
    })
    lodaing.close()
    })
    .catch(error => {
      lodaing.close()
      console.error(error);
    });
}

const onEnter = ()=>{

  sendFormData();
}
</script>

<style lang="less">
.fd-window-box{
  width: 500px;
  margin: 0 auto;
  padding: 15px;
  &__context{
   min-height: 200px;
  border: 1px solid #be2222;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
  }
  &__input{
  margin-top: 20px;
  }
}
</style>
