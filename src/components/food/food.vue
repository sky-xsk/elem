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
                 </div>

                 <div class="cartcontrol-wrapper">
                     <carcount :food="food"></carcount>
                 </div>

                 <div @click="addfiest" class="buyf" v-show="!food.count || food.count===0">加入购物车</div>   
                 
             </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import carcount from '../carcount/carcount.vue';
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        components: {
            carcount
        },
        data() {
            return {
                showFlag: false,
            };
        },

        methods: {
            show() {
                this.showFlag = true;
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
                console.log(this.food)


            },
        },

    }
</script>



<style>
    .contentf {
        padding: 18px;
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