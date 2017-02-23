<template>
  <div class="shopcart">
    <div class="contents">
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
        <div class="contentlright">
            <div class="pay" :class="payclass">{{paydesc}}</div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [{
                        price: 10,
                        count: 1
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
        computed: {
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
        }
    }
</script>

<style>
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