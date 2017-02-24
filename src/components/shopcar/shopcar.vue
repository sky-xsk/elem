<template>
  <div class="shopcart">
    <div class="contents" @click="tooglelist">
        <div class="contentleft">
            <div class="logo-wrapper">
                <div class="logoq" :class="{'lights':totalCount>0}">
                    <i class="zitis" :class="{'lightss':totalCount>0}">car</i>
                </div>
                
                <div class="numss" v-show="totalCount>0">{{totalCount}}</div>

            </div>
             <div class="priced" :class="{'gao':totalPrice>0}">￥{{totalPrice}}</div>
             <div class="descss">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="contentlright" @click.stop.prevent="paysd">
            <div class="pay" :class="payclass">{{paydesc}}</div>
        </div>
    </div>

<transition name="fold">
    <div class="shopcart-list" v-show="listshow" transition="fold">
        <div class="list-head">
            <h1 class="list-title">购物车</h1>
            <span class="list-empty" @click="enptys">清空</span>
        </div>
         <div class="list-content" ref="listcontent">
             <ul>
                 <li class="list-food" v-for="food in selectFoods">
                     <span class="list_name">{{food.name}}</span>
                     <div class="list-price">
                         <span>￥{{food.price*food.count}}</span>
                     </div>
                     <div class="cartss-wrapper">
                        <carcount :food="food"></carcount>
                     </div>
                 </li>
             </ul>
         </div>
    </div>
</transition>
<transition name="fades">
    <div class="list_mask" v-show="listshow" @click="hidelist"></div>
</transition>
  </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import carcount from '../carcount/carcount.vue';
    export default {
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [{
                        price: 0,
                        count: 0
                    }];
                }
            },

            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        components: {
            carcount
        },

        data() {
            return {
                fold: true,
            };
        },
        computed: {
            listshow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.listcontent) {
                            this.listcontent = new BScroll(this.$refs.listcontent, {
                                click: true
                            });
                        } else {
                            this.listcontent.refresh();
                        }

                    });
                }
                return show;
            },

            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },

            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },

            paydesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`
                } else {
                    return '去结算';
                }
            },
            payclass() {
                if (this.totalPrice < this.minPrice) {
                    return `not-enough`;
                } else {
                    return `enough`;
                }
            },
        },
        methods: {
            tooglelist() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            enptys() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            hidelist() {
                this.fold = true;
            },
            paysd() {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice}元`);
            }
        },
    }
</script>

<style>
    .shopcart-list {
        position: absolute;
        bottom: 48px;
        z-index: -1;
        left: 0;
        width: 100%;
    }
    
    .list_mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -3;
        opacity: 0.3;
        background: #000;
        backdrop-filter: blur(10px);
        transition: all .3s ease;
    }
    
    .fades-enter-active {
        opacity: 0.3;
    }
    
    .fades-leave-active {
        opacity: 0;
    }
    
    .fades-enter,
    .fades-leave-active {
        opacity: 0.3;
    }
    
    .fold-enter-active {
        transition: all .3s ease;
    }
    
    .fold-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    
    .fold-enter,
    .fold-leave-active {
        transform: translateY(10px);
        opacity: 0;
    }
    
    .list-head {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .list-title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    
    .list-empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 200);
    }
    
    .list-content {
        padding: 0 18px;
        max-height: 217px;
        background: #fff;
        overflow: hidden;
    }
    
    .list-food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .list_name {
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    
    .list-price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
    }
    
    .cartss-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
        line-height: 24px;
    }
    
    .numss {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        font-size: 9px;
        font-weight: 700;
        background: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.4);
        color: #fff;
    }
    
    .pay {
        font-weight: 700;
        line-height: 48px;
        height: 48px;
        text-align: center;
        font-size: 12px;
        color: #80858a;
    }
    
    .not-enough {
        background: #2b333b;
    }
    
    .enough {
        background: #00b43c;
        color: #fff;
    }
    
    .zitis {
        line-height: 44px;
        font-size: 24px;
        color: #80858a;
        text-align: center;
        font-style: normal;
    }
    
    .logoq {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #2b343d;
    }
    
    .lights {
        background: rgb(0, 160, 220)
    }
    
    .lightss {
        color: #fff;
    }
    
    .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #131d26;
    }
    
    .priced {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin-top: 12px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid #2c343f;
        font-size: 16px;
        font-weight: 700;
        color: #8e9196;
    }
    
    .gao {
        color: #fff;
    }
    
    .descss {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: #868992;
    }
    
    .contentleft {
        flex: 1;
    }
    
    .contentlright {
        flex: 0 0 105px;
        width: 105px;
        background: #2b343b;
    }
    
    .contents {
        display: flex;
        background: #141d27;
        height: 48px;
        font-size: 0;
    }
    
    .shopcart {
        height: 48px;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
    }
</style>