<template>
  <div class="fd-page">

    <div class="fd-window-box">
      <div class="fd-window-box__context">
        <h2>王答答</h2>
        <template v-for="(item,index) in form.qaList"  :key="index">
          <div style="white-space: pre-wrap;">
            <div  :class="item.role==='user'?'right':'left'" class='fd-window-box__message' >{{ item.content }}</div>
          </div>
        </template>
          
        </div>
      <div class="fd-window-box__input">
        <el-input placeholder="请输入内容,按回车确认" v-model="form.question" @keyup.enter="onEnter" />
        <el-button type="primary" @click="onEnter" style="margin-left:12px">
           发送
        </el-button>
      </div>
    </div>


    <el-button class="tr-button" type="primary" @click="openDrawer">
          配置你的电子助手
     </el-button>
    <el-drawer v-model="drawerVisible"  title="配置"  direction="rtl">
    <div class="tools-body">
      <div class="tools-body__choose">
        <el-radio-group v-model="form.radioOption">
          <el-radio :label="1">预设选项</el-radio>
          <el-radio :label="2">自定义选项</el-radio>
        </el-radio-group>
      </div>
      <div class="tools-body__item" v-show="form.radioOption===1">
        <div class="tools-body__item__label">
          请选择机器人的角色:
        </div> 
          <el-select placeholder="请选择机器人的角色" v-model="form.role" @change="setRole">
            <el-option v-for="(item,index) in ROLE_LIST" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
      <div class="tools-body__item" v-show="form.radioOption===2">
        <div class="tools-body__item__label">
          请输入你想要的角色:
        </div> 
        <div class="tools-body__item__context">
           <el-input placeholder="请输入你想要的角色" v-model="form.role" @keyup.enter="setRole" />
           <el-button type="primary" @click="setRole" style="margin-left:12px"> 
              确定
           </el-button>
        </div>
      </div>

      <div class="tools-body__item">
        <div class="tools-body__item__label">
          请输入openAI secret key:
        </div> 
        <div class="tools-body__item__context">
           <el-input   placeholder="请输入openAI secret key" v-model="form.apiKey"  />
        </div>
      </div>
    </div>
  </el-drawer>

  <audio controls autoplay  class="cusotmer-audio"  :src="form.audioUrl">
     <source :src="form.audioUrl" >
 </audio>
 <!-- <el-button @click="getAudio"> 获取音频</el-button> -->
 <!-- {{  form.audioUrl }} -->
</div>

</template>


<script setup>
import { ref } from 'vue';
import useSendData from '../hooks/useSendData';
import {ROLE_LIST} from '../config';
const drawerVisible = ref(false)

const openDrawer = ()=>{
  drawerVisible.value = true;
}
const {onEnter, setRole, form} =  useSendData();
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
    display: flex;
    margin-top: 20px;
  }
 
  &__message{
    margin:10px;
    text-align: right;
    background-color: gray;
    padding:8px;
    border-radius: 10px;
    color: #fff;

  }
}
.tools-body{
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  &__choose{
    padding-bottom: 20px;
  }
  &__item{
   display: flex;
   align-items: center;
   margin-bottom: 12px;
    &__label{
      width: 200px;
      text-align: right;
      padding-right: 12px;
    }
    &__context{
      display: flex;
     flex: 1;
    }
  }
}

.left{
 text-align: left;
}

.right {
  text-align: right;
}

.tr-button{
  position: absolute;
  top: 40px;
  right: 40px;
 }

 .cusotmer-audio{
   display: none;
 }
</style>
