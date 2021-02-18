<template><!-- template 는 없는태그로 적용된다-->
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}} 점</div>
        
    </div>
</template>

<script>
let interval=null;
const rspCoords={
    바위:'0',
    가위:'-142px',
    보:'-284px',
}
const scores={
    가위: 1,
    바위:0,
    보:-1,
};

 const computerChoice=(imgcode)=>{
     return Object.entries(rspCoords).find(function(v){
         return v[1] ===imgcode;
     })[0];
 };
export default {
    data(){
        return {
           imgcode:rspCoords.바위, 
           result: '',
           score:0,
        };
    },
    computed: {//일반데이터를 가공해서 쓸때 사용,성능에 관련
       computedStyleObject(){
           return {
               background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgcode} 0 ` ,
           };
       }
    },
    methods: { 
        onClickButton(choice){
            clearInterval(interval);
            const myScore=scores[choice];
            const cpuScore=scores[computerChoice(this.imgcode)];
            const diff=myScore-cpuScore;
            if(diff===0){
                this.result='비겼습니다';
            }else if([-1,2].includes(diff)){
                this.result='이겼습니다.';
                this.score+=1;
            }else{
                this.result="졌습니다.";
                this.score -=1;
            }
            setTimeout(()=>{
               this.changeHand();
            },1000);
        },
        changeHand(){
            interval=setInterval(() =>{
            if(this.imgcode === rspCoords.바위){
                this.imgcode=rspCoords.가위;
            }else if(this.imgcode === rspCoords.가위){
                this.imgcode=rspCoords.보;
            }else if(this.imgcode ===rspCoords.보){
                this.imgcode = rspCoords.바위;
            }
        },100);
        },
    },
    beforeCreate(){
        console.log('bdforecreated');
    },
    created(){
        console.log('created');
    },
    beforeMount(){
        console.log('beforemount');
    },
    mounted(){
        this.changeHand();
        console.log('mounted');
    },
    beforeUpdate(){
        console.log('befordupdaet');
    },
    updated(){
        console.log('updated');
    },
    beforeDestroy(){//메모리 누수를 방지
        console.log('beforeDestory');
        clearInterval(interval);
    },
    destroyed(){
        console.log('destroyed')
    }

};
</script>

<style scoped>
    #computer{
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>