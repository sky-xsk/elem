<template>
  <div class="xseller" ref="sellerwrappers">
       <div class="xsellercont">
            <div class="xsellerview">
                <h1 class="xtitle">{{seller.name}}</h1>
                <div class="xdesc">
                    <span  class="xstarts">
                    <el-rate
                        v-model="seller.score"
                        disabled
                        show-text
                        text-color="#ff9900"
                        text-template="" >
                    </el-rate>
                    </span>
                    <span class="xtext">({{seller.ratingCount}})</span>
                    <span class="xtext">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="xremark">
                    <li class="xblock">
                        <h2>起送价</h2>
                        <div class="xcontent">
                            <span class="xstress">{{seller.minPrice}}<i>元</i></span>
                        </div>
                    </li>
                     <li class="xblock">
                        <h2>商家培送</h2>
                        <div class="xcontent">
                            <span class="xstress">{{seller.deliveryPrice}}<i>元</i></span>
                        </div>
                    </li>
                     <li class="xblock">
                        <h2>平均配送时间</h2>
                        <div class="xcontent">
                            <span class="xstress">{{seller.deliveryTime}}<i>元</i></span>
                        </div>
                    </li>
                </ul>
                 <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{'fac_active':favorite}"></span>
                    <span class="txext">{{favoriteText}}</span>
                </div>
            </div>

          <split></split>

           <div class="xbulletin">
             <h1 class="x_title">公告与活动</h1>
              <div class="xcontent-wrapper">
                <p class="xxcontent">{{seller.bulletin}}</p>
             </div>

             <ul v-if="seller.supports" class="xsupports">
                <li class="xsupport-item" v-for="(item,$index) in seller.supports">
                    <span class="xtexts">{{seller.supports[$index].description}}</span>
                </li>
            </ul>   
        </div>
          <split></split>   

           <div class="pics">
             <h1 class="x_title">商家实景</h1>
               <div class="pic-wrapper swiper-container">
                <ul class="swiper-wrapper">
                    <li v-for="pic in seller.pics"  class="swiper-slide"> 
                        <img :src="pic" width="120" height="90">
                    </li> 
                </ul>
            </div>
        </div>

        <split></split>   

         <div class="info">
            <h1 class="xtitle-seller">商家信息</h1>
            <ul>
               <li class="info-item" v-for="info in seller.infos">{{info}}</li>
            </ul>
      </div>

       </div>
  </div>
</template>

<script>
    import split from './split/split.vue';
    import {saveToLocal, loadFromLocal} from 'common/js/store';
    import BScroll from 'better-scroll';
    export default {
        components: {
            split
        },
        props: {
            seller: {
                type: Object,
            },
        },
        data() {
            return {
              favorite: (() => {
                 return loadFromLocal(this.seller.id, 'favorite', false);
              })()
            }
        },

        mounted() {
            this.initScroll();
            this.swipers();
        },

        watch: {
            'seller' () {
                this.initScroll();
                this.swipers();
            }
        },
         computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            },
            
         },
        methods: {
           //图片滚动 
            swipers(){
                this.$nextTick(()=>{
                     var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 3,
                        spaceBetween: 10,
                        freeMode: true,
                    });
                });
            },


            initScroll() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.sellerwrappers, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
         },

         toggleFavorite(event) {
            if (!event._constructed) {
                return;
            }
            this.favorite = !this.favorite;
            saveToLocal(this.seller.id, 'favorite', this.favorite);
          }
      },

    }
</script>

<style>
.swiper-container { }
.swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        width: 120px; height: 90px; 
        margin:0 5px 0 5px; 
    }
    .xseller {
        position: absolute;
        top: 174px;
        bottom: 0px;
        width: 100%;
        overflow: hidden;
    }
    
    .xsellerview {
        position: relative;
        padding: 18px;
    }
    
    .xtitle {
        font-size: 14px;
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
    }
    
    .xdesc {
        padding-bottom: 18px;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .xtext {
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
        font-weight: 700;
    }
    
    .xstarts {
        display: inline-block;
    }
    
    .xremark {
        display: flex;
        padding-top: 18px;
    }
    
    .xblock {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .xblock:last-child {
        border-right: none;
    }
    
    .xblock h2 {
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159)
    }
    
    .xcontent {
        line-height: 24px;
        font-size: 10px;
        color: rgb(7, 17, 27)
    }
    
    .xstress {
        font-size: 24px
    }
    .xstress i{font-size: 14px; color: #999; font-style: normal; padding-left: 4px;}
    .xbulletin {
        padding: 18px 18px 0 18px;
    }
    
    .xcontent-wrapper {
        padding: 0 12px 16px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .xxcontent {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
        margin-top: 10px;
    }
    
    .xsupport-item {
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding: 16px 12px;
        font-size: 0;
    }
    
    .xtexts {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27)
    }
    
    .pics {
        padding: 18px;
    }
    
    .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 16px;
    }
    
    .pic-list {
        font-size: 0;
    }
    
    .pic-item {
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
    }
    
    .pic-item:last-child {
        margin: 0;
    }
    
    .info {
        padding: 18px 18px 0 18px;
        color: rgb(7, 17, 27);
    }
    
    .xtitle-seller {
        padding-bottom: 12px;
        line-height: 14px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 14px;
    }
    
    .info-item {
        padding: 16px 12px;
        line-height: 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
    }
    
    .info-item:last-child {
        border-bottom: none;
    }
    .favorite{position: absolute; width: 50px;right: 11px; top: 18px; text-align: center;}
    .icon-favorite{width: 50px; height: 16px; border: 1px solid #ccc;  background: #ccc;  display: block; margin-bottom: 4px;line-height: 24px;font-size: 24px;color: #d4d6d9}
    .txext{line-height: 10px;font-size: 10px ;color: rgb(77, 85, 93);}    
    .fac_active{background: rgb(240, 20, 20);}
        
</style>