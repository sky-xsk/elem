<template>
<transition name ="move">
    <div v-show="showFlag" class="food" ref="foodwrapper">
             <div class="food-content">
                 <div class="image-header">
                     <img :src="food.image">
                     <div class="back"><i class="backs_food" @click="food_hide">返回</i></div>
                 </div>

                 <div class="contentf">
                     <div class="titlef">{{food.name}}</div>
                     <div class="detailf">
                         <span class="sell_count">月售{{food.sellCount}}份</span>
                         <span class="ratingf">好评率{{food.rating}}%</span>
                     </div>

                     <div class="price">
                          <span class="now">￥{{food.price}}</span>
                          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                     </div>
                      <div class="cartcontrol-wrapper">
                     <carcount :food="food"></carcount>
                 </div>
            
                  <div @click.stop.prevent="addfiest" class="buyf" v-show="!food.count || food.count===0">加入购物车</div> 
                 </div>
                 
               <split v-show="food.info"></split>  
                
               <div class="infof" v-show="food.info">
                   <h1 class="titlesf">商品信息</h1>
                   <p class="infofs">{{food.info}}</p>
              </div>   
             <!--组件-->    
             <split></split>  

             <div class="tatingfd infof">
                  <h1 class="titlesf" >商品评价</h1>
                  <ratingselect :selec-tType="selectType" :only-Content="onlyContent" :desc = "desc" :ratings = "food.ratings"></ratingselect>

                  <div class="ratingli-wrapper">
                        <ul v-show ="food.ratings && food.ratings.length">
                            <li v-for="rating in food.ratings" class="ratitem"  v-show="needShow(rating.rateType,rating.text)">
                                <div class="user_rat">
                                    <span class="user_ratname">{{rating.username}}</span>
                                    <img class="avatar_rta" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time-rat">{{rating.rateTime | formatDate }}</div>
                                <p class="text-rat"> {{rating.text}}</p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.rating || food.rating.length">暂无评价</div>
                  </div>  
             </div>
        </div>
     </div>
</transition>
</template>

<script>
    const ALL = 2;
    import {formatDate} from 'common/js/date';
    import BScroll from 'better-scroll';
    import carcount from '../carcount/carcount.vue';
    import split from '../split/split.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            carcount,
            split,
            ratingselect
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,

                desc: {
                    all: "全部",
                    positive: "推荐",
                    negative: "吐槽",
                },

            };
        },
         events: {
      'ratingtype.select'(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
        methods: {
             needShow(type, text) {
                if (this.onlyContent && !text) {
                return false;
                }
                if (this.selectType === ALL) {
                return true;
                } else {
                return type === this.selectType;
                }
            },
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.foodwrapper, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh();
                    }
                });
            },

            food_hide() {
                this.showFlag = false;
            },

            addfiest(event) {
                if (!event._constructed) {
                    return;
                };
                Vue.set(this.food, 'count', 1);
            },

        },

    }
</script>
<style>
    .ratingli-wrapper{
        padding: 0 18px;
    }
    .ratitem{
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .user_rat{
        position: absolute;
        right:0;
        top:16px;
        font-size: 0;
        line-height: 12px;
    }
    .user_ratname{
        margin-right: 6px;
        color: rgb(147,153,159);
        display: inline-block;
        font-size: 10px;
        vertical-align: top;
    }
    .avatar_rta{
        border-radius:50%; 
    }
    .time-rat{
        font-size: 10px;
        line-height: 12px;
        color: rgb(147,153,159);
        margin-bottom:6px; 
    }
    .text-rat{
        line-height: 16px;
        font-size: 12px;
        color:rgb(7,17,27);
    }
    .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147,153,159);
        text-align:center;
    }
    .tatingf {
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        padding: 0 8px;
    }
    
    .infof {
        padding: 18px;
    }
    
    .titlesf {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    
    .infofs {
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        padding: 0 8px;
    }
    
    .contentf {
        padding: 18px;
        position: relative;
    }
    
    .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    
    .buyf {
        position: absolute;
        right: 12px;
        bottom: 12px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: rgb(0, 160, 220);
    }
    
    .titlef {
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    
    .detailf {
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        height: 10px;
    }
    
    .sell_count,
    ratingf {
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .sell_count {
        margin-right: 12px;
    }
    
    .back {
        top: 10px;
        position: absolute;
        left: 0px;
    }
    
    .backs_food {
        display: block;
        padding: 10px;
        font-size: 15px;
        color: #fff;
        font-style: normal;
    }
    
    .image-header {
        position: relative;
        /*宽高相等的容器 css魔法*/
        width: 100%;
        height: 0;
        padding-top: 100%;
    }
    
    .image-header img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .move-enter-active {
        transition: all .2s linear;
        transform: translate3d(0, 0, 0);
    }
    
    .move-enter,
    .move-leave-active {
        transition: all .2s linear;
        transform: translate3d(100%, 0, 0);
    }
    
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
    }
</style>