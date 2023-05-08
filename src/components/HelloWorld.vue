<template>
  <div class="fd-page">

    <div class="fd-window-box">
      
      <div class="fd-window-box__context">
        <template v-for="(item,index) in form.qaList"  :key="index">
          <div style="white-space: pre-wrap;">
            <div v-if="item.question" class="fd-window-box__question">{{ item.question }}</div>
            <ul v-if="item.answer" class="fd-window-box__answer">
              <li v-for="(aw, inx) in item.answer " :key="inx">
                {{ aw }}
              </li>
            </ul>
          </div>
        </template>
          
        </div>
      <div class="fd-window-box__input">
        <el-input placeholder="请输入内容,按回车确认" v-model="form.question"   @keyup.enter="onEnter" />
      </div>
    </div>

    <div class="footer-tools">
      <div class="footer-tools__item">
        <div class="footer-tools__item__label">
          请输入openAI secret key:
          </div> 
        <div>
           <el-input  style="width: 280px;" placeholder="请输入openAI secret key" v-model="form.apiKey"  />
        </div>
     </div>
      <div class="footer-tools__item">
          <div class="footer-tools__item__label">
            请选择机器人的角色:
          </div> 
            <el-select  placeholder="请选择机器人的角色" v-model="form.role" @change="setRole">
              <el-option v-for="(item,index) in ROLE_LIST"  
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
      <div class="footer-tools__item">
          <div class="footer-tools__item__label">
            请输入你想要的角色:
          </div> 
           <div>
              <el-input placeholder="请输入你想要的角色" v-model="form.role"   @keyup.enter="setRole" />
           </div>
        </div>
    </div>
</div>

</template>


<script setup>
import { ElLoading } from 'element-plus'
import {config, options, ROLE_LIST} from '../config';

import { reactive } from 'vue'
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://156.236.73.178:3005'
})

const form = reactive({
  information:'',
  qaList:[{
   question:'',
   answer:['我是一个聊天机器人，请问有什么问题问我？']
  }],
  question:'',
  apiKey:'',
  role:''
})

const useSendData = ()=>{
    const sendFormData = () => {
    form.messages = form.qaList.slice(1)
    const lodaing = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',})
      const data = { options: {...options,messages:form.messages},config:{...config,apiKey:form.apiKey} };
      instance.post("/api/createCompletion", data)
        .then(response => {
          const {choices} = response.data.data;
          form.qaList[form.qaList.length-1].answer = choices.map(item=>{
          return item.message.content
        })
        lodaing.close()
        })
        .catch(error => {
          lodaing.close()
          console.error(error);
        });
    }

  //   const generatorParams = () => {
  //   const qaStrings = form.qaList.map(({ question, answer }) => `Q: ${question} A: ${answer}`)
  //   return qaStrings.join('\n')
  // }
    const onEnter = ()=>{
      form.qaList.push({
        question: form.question,
        answer:'',
      })
      sendFormData();
    }


  const setRole = ()=>{
    form.qaList=[{
        question:'',
        answer:['我是一个聊天机器人，请问有什么问题问我？']
      }],
    form.qaList.push({
        question: `接下来你的身份是${form.role},请用这个身份和我对话`,
        answer:'',
        role:'system'
      })
      sendFormData();
  }
    return {
      setRole,
      sendFormData,
      onEnter
    }
}


  const {onEnter,setRole} =  useSendData();

</script>

<style lang="less">
.fd-page{
 display: flex;
 justify-content: center;
}
.fd-window-box{
  width: 700px;
  padding: 15px;
  &__context{
  min-height: 500px;
  max-height: 600px;
  overflow: auto;
  border: 1px solid #be2222;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
  }
  &__input{
  margin-top: 20px;
  }
 
  &__question{
    margin:10px;
    text-align: right;
    background-color: gray;
    padding:8px;
    border-radius: 10px;
    color: #fff;

  }
  &__answer{
    margin:10px;
    text-align: left;
    background-color: gray;
    border-radius: 10px;
    padding:8px;
    color: #fff;
  }
}
.footer-tools{
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  box-shadow: 1px 0.5px 2px 1px rgb(224, 224, 224);
  &__item{
   display: flex;
   align-items: center;
    &__label{
      width: 200px;
    }
  }
}
</style>
