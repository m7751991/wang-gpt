import { reactive } from 'vue'
import { ElLoading } from 'element-plus'
import {config, options} from '../config';
import axios from '../plugins/axios';


export  default ()=>{
  const form = reactive({
      qaList:[],
      question:'',
      apiKey:'',
      role:'',
      roleObj:null,
      radioOption:1,
      audioUrl:''
    })

    const sliceCtx = ()=>{
        let start = form.qaList.length>4?form.qaList.length-4:0
        const list = form.qaList.slice(start)
        return form.roleObj ? [form.roleObj].concat(list) : list
    }

    const sendFormData = () => {
        form.messages = sliceCtx()
        const lodaing = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        const data = { options: {...options,messages:form.messages},config:{...config,apiKey:form.apiKey} };
        axios.post("/api/createCompletion", data)
            .then(response => {
              const {content,audioUrl} = response.data.data;
              
                form.qaList.push({
                  role:'assistant',
                  content:content
                })
                form.audioUrl = audioUrl
                lodaing.close()
                // getAudio()
             }).catch(error => {
                 lodaing.close()
                 console.error(error);
              });
     }
        const onEnter = ()=>{
        form.qaList.push({
            role:'user',
            content:form.question
        })
        sendFormData();
        form.question = ''
    }

    const getAudio = ()=>{
        const fn =  ()=>{
            axios.get('/api/getAudio').then(res=>{
               console.log(res.data);
               if (!res.data.url) {
                setTimeout(()=>{
                    fn()
                },500)
               }else{
                   form.audioUrl = res.data.url+'?time='+ new Date().getTime()
               }
             }).catch(e=>{console.log(e);})
          
             }
             fn()
        }

    const setRole = ()=>{
        form.qaList=[],
        form.roleObj = {
            content: `接下来你的身份是${form.role},请用这个身份和我对话`,
            role:'system'
        }
        sendFormData();
    }
        return {
         form,
         getAudio,
         setRole,
         sendFormData,
         onEnter
        }
}