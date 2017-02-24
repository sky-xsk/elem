<template>
  <div class="goods">
       <div class="menu-wapper" ref="menuwapper">
           <ul>
              <li @click="selectMenu($index,$event)" v-for="(item,$index) in goods" class="menu-item"  :class="{'current':currentIndex === $index }">
                   <span class="textq">
                       <span v-show="item.type>0" class="icon"></span>{{item.name}}
                   </span>
               </li>
          </ul>
       </div>
        <div class="foods-wapper" ref="foodswapper">
            <ul>
                <li v-for="item in goods" class="foodlist food-list-hook">
                    <h1 class="titles">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="iconq">
                                <img :src="food.icon" width="57" height="57">    
                            </div>
                            <div class="content">
                                <h2 class="namess">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>

                                  <div class="catrwrapper">
                                    <carcount :food="food"></carcount>
                                </div>

                            </div>    
                        </li>    
                    </ul> 
                </li>
            </ul>
        </div>
        <shop  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price = "seller.minPrice"></shop>
  </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shop from './shopcar/shopcar.vue';
    import carcount from './carcount/carcount.vue';
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            shop,
            carcount
        },

        data() {
            return {
                goods: [],
                listheight: [],
                scrollY: 0,

            };
        },
        computed: { //计算样式
            currentIndex() {
                for (var i = 0; i < this.listheight; i++) {
                    var height1 = this.listheight[i];
                    var height2 = this.listheight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },

            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            },

        },

        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this.scrollsq();
                        this.calculate();
                    });

                }
            })
        },

        methods: {
            //点击滑动
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                };
                let foodList = this.$refs.foodswapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 500);
            },

            scrollsq() {
                this.meunScroll = new BScroll(this.$refs.menuwapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodswapper, {
                    click: true,
                    probeType: 3
                });

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },

            calculate() {
                let foodList = this.$refs.foodswapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listheight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let itemss = foodList[i];
                    height += itemss.clientHeight;
                    this.listheight.push(height);
                }
            }
        },
    }
</script>


<style>
    /*从下网上看代码 1像素的暂时没有调整兼容性*/
    
    .current {
        position: relative;
        margin-top: -1px;
        z-index: 10000;
        background: #fff;
        font-weight: 700;
    }
    
    .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159)
    }
    
    .now {
        color: #f01414;
        font-size: 14px;
        font-weight: bold;
    }
    
    .catrwrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
    }
    
    .price {
        font-weight: 700;
    }
    
    .extra {
        line-height: 10px;
        color: rgb(147, 153, 159);
        margin-bottom: 8px;
        font-size: 10px;
    }
    
    .extra span {
        margin-right: 6px;
    }
    
    .desc {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .namess {
        font-size: 14px;
        margin: 2px 0 8px 0;
        line-height: 14px;
        height: 14px;
        color: rgb(7, 17, 27);
    }
    
    .content {
        flex: 1;
    }
    
    .iconq {
        flex: 0 0 57px;
        margin-right: 10px;
    }
    
    .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        position: relative;
    }
    
    .food-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .titles {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
    }
    
    .textq {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        line-height: 20px;
    }
    
    .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
    }
    
    .menu-wapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
    }
    
    .foods-wapper {
        flex: 1;
    }
    
    .goods {
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
        display: flex;
        overflow: hidden;
    }
</style>