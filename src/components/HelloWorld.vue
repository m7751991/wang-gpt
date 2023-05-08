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
import useSendData from '../hooks/useSendData';
import {ROLE_LIST} from '../config';
const {onEnter, setRole, form} =  useSendData();
</script>

<style lang="less">
.fd-page{
  // position: relative;
 display: flex;
 justify-content: center;
//  padding-bottom: 40px;
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
 
  &__message{
    margin:10px;
    text-align: right;
    background-color: gray;
    padding:8px;
    border-radius: 10px;
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

.left{
 text-align: left;
}

.right {
text-align: right;
}
</style>
