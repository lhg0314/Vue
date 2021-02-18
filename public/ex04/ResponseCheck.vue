<template><!-- template 는 없는태그로 적용된다-->
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
        <div v-show="result.length"><!-- false일 경우 display :none,  v-if는 존재 X -->
            <div>평균시간: {{average}}ms</div>
            <button @click="onReset">리셋 </button>
        </div>
    </div>
</template>

<script>
let startTime=0;
let endTime=0;
let timeout=null;
 
export default {
    data(){
        return {
            result:[],
            state: 'waiting',
            message:'클릭해서 시작하세요',
        }
    },
    computed: {//일반데이터를 가공해서 쓸때 사용,성능에 관련
        average(){
            return this.result.reduce((a,c)=>a+c,0)/this.result.length || 0;
        }
    },
    methods: { 
        onReset(){
            this.result=[];
        },
        onClickScreen(){
            if(this.state ==='waiting'){
                this.state='ready';
                this.message="초록색이 되면 클릭하세요"
              timeout=  setTimeout(()=>{
                    this.state='now';
                    this.message='지금 클릭';
                    startTime=new Date();
                },Math.floor(Math.random() * 1000)+200);
            }else if(this.state==='ready'){
                clearTimeout(timeout);
                this.state ='waiting';
                this.message="너무 성급히시군요 초록색이 되면 클릭하세요"
            }else if(this.state === 'now'){
                endTime=new Date();
                this.state='waiting';
                this.message='클릭해서 시작하세요'
                this.result.push(endTime-startTime);
            }
        }
    },
};
</script>

<style scoped>
#screen{
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
}

#screen.waiting{
    background-color: aqua;
}
#screen.ready{
    background-color: red;
    color: white;
}
#screen.now{
    background-color: greenyellow;
}
</style>