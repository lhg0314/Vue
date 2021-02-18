<template><!-- template 는 없는태그로 적용된다-->
    <div>
        <div>당첨숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번더!</button>
    </div>
</template>

<script>
import LottoBall from './LottoBall';
function getWinNumber(){
    console.log('gtwinnumber');
    const candidate=Array(45).fill().map((v,i)=>i+1);
    const shuffle=[];
    while(candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
    }
    const bonusNumber=shuffle[shuffle.length -1];
    const winNumber=shuffle.slice(0,6).sort((p,c)=>p-c);
    return [...winNumber,bonusNumber];
}
const timeouts=[];  

export default {
    components:{
        'lotto-ball':LottoBall,
    },
    data(){
        return {
            winNumbers:getWinNumber(),
            winBalls:[],
            bonus:null,
            redo:false,
        };
    },
    computed: {//일반데이터를 가공해서 쓸때 사용,성능에 관련
      
    },
    methods: { 
        onClickRedo(){
            this.winNumbers=getWinNumber();
            this.winBalls=[];
            this.bonus=null;
            this.redo=false;
            
            
        },
        showBalls(){
            for(let i=0;i<this.winNumbers.length-1;i++){
                
            timeouts[i]= setTimeout(()=>{
                this.winBalls.push(this.winNumbers[i]);
            },(i+1)*1000);
        }
            timeouts[6]=setTimeout(()=>{
                this.bonus=this.winNumbers[6];
                this.redo=true;
            },7000);
        }
    },
   
    mounted(){
        this.showBalls();
    },
    
    beforeDestroy(){
       timeouts.forEach((t)=>{
           clearTimeout(t);
       })
    },
    watch:{
        winBalls(val,oldVal){
            if(val.length===0){
                this.showBalls();
            }
        }
    },

};
</script>

<style scoped>
    
</style>