<template>
     <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="blockf posivtie" :class="{'activeblc':selectType === 2}">{{desc.all}}
                <span class="countf">{{ratings.length}}</span>
            </span>
            <span @click="select(0,$event)" class="posivtie blockf" :class="{'activepos':selectType === 0}">{{desc.positive}}
                 <span class="countf">{{posivties.length}}</span>
            </span>
            <span @click="select(1,$event)" class="blockf negivtie" :class="{'acrtiveneg':selectType === 1}">{{desc.negative}}
                 <span class="countf">{{negivties.length}}</span>
            </span>
        </div>
        <div class="switch" >
            <span class="icon-check" :class="{'icon-onss':onlyContent}" @click="toggleContent"></span>
            <span class="textrat">只看有内容的评价</span>
        </div>

     </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            ratings: {
                type: Array,
                default () {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: "全部",
                        positive: "满意",
                        negative: "不满意"
                    };
                }
            },
        },

        data(){
            return {
                 
            }
        },

        methods:{
            select(type,event){
                if (!event._constructed) {
                    return;
                };
                this.selectType = type;
                this.$emit('ratingtype.select',type);
            },
            toggleContent(){
                 if (!event._constructed) {
                    return;
                };
                this.onlyContent = !this.onlyContent;
                this.$emit('content.toggle',this.onlyContent);
            },
        },

        //计算样式
        computed:{
            posivties(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === POSITIVE;
                })
            },
            negivties(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === NEGATIVE;
                })
            }
        },


    };
</script>



<style>
    .ratingselect {}
    
    .rating-type {
        padding:18px 0;
        margin: 0 18px;
        border-bottom:1px solid rgba(7,17,27,0.1); 
        font-size: 0;
    }
    .blockf{
        display: inline-block;
        padding:8px 12px;
        border-radius:2px;
        margin-right: 8px; 
        color: rgb(77,85,93);
        font-size: 12px;
    }
    .activeblc{
        background: rgb(0, 160, 220);
        color:#fff; 
    }

    .posivtie{
       background: rgba(0,160,220,0.2);
    }
    .activepos{
       background: rgb(0,160,220);
       color: #fff;
    }

    .negivtie{
        background: rgba(77,85,93,0.2);
        
    }
    .acrtiveneg{
          background: rgb(77,85,93);
          color: #fff;
    }
    .countf{
        font-size: 8px;
        margin-left: 2px;
        line-height: 16px;
    }

    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom:1px solid rgba(7,17,27,0.1); 
        color: rgb(147,153,159);
    }

    .textrat{font-size: 12px;}

  
    .icon-check {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        border: 1px solid rgb(0, 160, 220);
        vertical-align: middle;
    }

    .icon-onss{
        background: rgb(0, 160, 220);
    }
</style>