<template>
  <div class="carcount">
       <transition name="move">
       <div class="cart-decrase" v-show="food.count>0" @click.stop.prevent="decrase($event)" transition="move">
           <span class="inner">-</span>
        </div>
       </transition> 
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div> 
       <div class="cart-add" @click.stop.prevent="addcart($event)">+</div> 
  </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addcart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
            },

            decrase(event) {
                if (!event._constructed) {
                    return;
                }

                if (this.food.count) {
                    this.food.count--;
                }
            },
        },

        created() {

        },
    }
</script>



<style>
    .inner {
        display: inline-block;
        width: 20px;
        text-align: center;
        height: 20px;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        transform: rotate(0);
    }
    
    .move-enter-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    
    .move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        transform: rotate(180deg);
    }
    
    .move-enter,
    .move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        transform: rotate(180deg);
    }
    
    .carcount {
        font-size: 0;
    }
    
    .cart-decrase {
        display: inline-block;
        width: 20px;
        text-align: center;
        height: 20px;
        border-radius: 50%;
        line-height: 18px;
        font-size: 20px;
        color: #fff;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
    }
    
    .cart-count {
        display: inline-block;
        font-size: 16px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        padding: 0 6px 0 6px;
        color: rgb(147, 153, 159);
    }
    
    .cart-add {
        display: inline-block;
        width: 20px;
        text-align: center;
        height: 20px;
        font-size: 20px;
        line-height: 18px;
        color: #fff;
        border-radius: 50%;
        background: rgb(0, 160, 220);
    }
</style>