<template>
    <div class="ratings" ref="mratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overviewleft">
                    <h1 class="scroe">{{seller.score}}</h1> 
                    <div class="rattile">综合评价</div>
                    <div class="ratrangk">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overviewright">
                    <div class="score-wrapper">
                        <span class="fw_title">服务态度</span>
                        <div class="fw_text">
                            <el-rate
                            v-model="seller.serviceScore"
                            disabled
                            show-text
                            text-color="#ff9900"
                            text-template= '{value}' >
                            </el-rate>
                        </div>   
                    </div>
                    <div class="score-wrapper">
                        <span class="fw_title">商品评分</span>
                        <div class="fw_text">
                            <el-rate
                            v-model="seller.foodScore"
                            disabled
                            show-text
                            text-color="#ff9900"
                            text-template= '{value}' >
                            </el-rate>
                        </div>   
                    </div>
                    <div class="arr_timewrapper">
                        <span class="fw_title">送达时间</span>
                        <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            
            <split></split>
              <!--此处报错，问题还未解决,数据传输时显示未定义 :desc = "desc"-->
            <ratingselect :selec-tType="selectType" :only-Content="onlyContent"  :ratings = "ratings"></ratingselect>    

            <div class="rating-wrapperss">
                <ul>
                    <li v-for ="rating in ratings" class="ratingitem" v-show="needShow(rating.rateType,rating.text)">
                          <div class="mavatar">
                             <img :src="rating.avatar" width="35" height="35">
                          </div>  
                          <div class="mcontent">
                             <h1 class="manne">{{rating.username}}</h1>
                             <div class="mstarwrapper">
                                <el-rate
                                v-model="rating.score"
                                disabled
                                show-text
                                text-color="#ff9900"
                                text-template= '' class="starsize" >
                                </el-rate>
                                <span class="mdeliver" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                             </div>
                             <p class="mtext">{{rating.text}}</p>
                              <div class="recommend" v-show = "rating.recommend && rating.recommend.length">
                                  <span class="mup">推荐</span>
                                  <span class="mitem" v-for="item in rating.recommend">{{item}}</span>
                              </div>
                               <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                          </div>
                    </li>
                </ul>
            </div>
            

        </div>
    </div>
</template>

<script>

const POSITIVE = 0;
 const NEGATIVE = 1;
const ALL = 2;
  import {formatDate} from 'common/js/date';
  import BScroll from 'better-scroll';
  import star from './star/star.vue';
  import split from './split/split.vue';
  import ratingselect from './ratingselect/ratingselect.vue';
    export default {
        name: 'ratingsr',
         components: {
           star,split,ratingselect
        },
         props: {
            seller: {
                type: Object
            }
        },

         filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            }
        },
        
        methods:{
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
        },
         data() {
            return {
                sellerss:'',  
                sellerq:[],
                ratings:[],  
                selectType: ALL,
                onlyContent: true,
            }
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
        created() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === 0) {
                    this.sellerq = response.data;
                    this.sellerss = this.seller.serviceScore; 
                }
            });

            this.$http.get('/api/ratings').then((response) => {
                response = response.body;
                if (response.errno === 0) {
                   this.ratings = response.data;
                   this.$nextTick(()=>{
                         this.scroll = new BScroll(this.$refs.mratings, {
                         click: true
                     });
                   });
                   
                }
            });
       },
    }
</script>

<style>
   .ratings{ position: absolute; top:174px; bottom: 0px; width: 100%; overflow: hidden;}
   .overview{ display: flex;padding: 18px 0;}
   .overviewleft{flex: 0 0 137px; width: 137px; border-right: 1px solid rgba(7,17,27,0.1);text-align: center; padding: 6px 0; }
   .overviewright{flex: 1;  padding: 6px 0 6px 24px}
   .scroe{line-height: 28px; color: rgb(255,153,0);font-size: 24px;margin-bottom: 6px;}
   .rattile{font-size: 12px;line-height: 12px; color: rgb(7,17,27); margin-bottom: 8px;}
   .ratrangk{line-height: 10px; font-size: 10px; color: rgb(147,153,159); }
   .score-wrapper{line-height: 18px; margin-bottom: 8px;font-size: 0;}
   .fw_title{display: inline-block; font-size: 12px; color: rgb(7,17,27); vertical-align: top;}
   .fw_text{display: inline-block; margin-left: 5px;vertical-align: top; margin: 0 12px;}
   .deliveryTime{display: inline-block; font-size: 12px; line-height: 12px;  color: rgb(147,153,159);  vertical-align: top;margin-left: 5px;}
  @media only screen and (max-width: 375px){
     .overviewleft{flex: 0 0 120px; width: 120px;}
     .overviewright{flex: 1;  padding: 6px 0 6px 18px}
  }

 @media only screen and (max-width: 320px){
     .overviewleft{flex: 0 0 105px; width: 105px;}
     .overviewright{flex: 1;  padding: 6px 0 6px 20px}
     .ratrangk{line-height: 20px;}
     .fw_title{padding-left:12px; }
  }
  .rating-wrapperss{padding:0 18px;}
  .ratingitem{display: flex; border-bottom: 1px solid rgba(7,17,27,0.1);padding:18px 0;}
  .mavatar{ flex: 0 0 35px; margin-right: 12px;}
  .mavatar img{border-radius:50%;}
  .mcontent{ position: relative; flex: 1}
  .manne{line-height: 10px; font-size: 14px; color: rgb(7, 17, 27);margin-bottom: 4px}
  .mstarwrapper{  margin-bottom: 6px; font-size: 0 }
  .starsize{ display: inline-block; margin-right: 6px; vertical-align: middle}
  .mdeliver{display: inline-block; vertical-align:middle; line-height: 14px;font-size: 12px;color: rgb(147, 153, 159);}
  .mtext{ margin-bottom: 8px;line-height: 18px;color: rgb(7, 17, 27); font-size: 14px}
  .recommend{line-height: 16px; font-size: 0}
  .mup{ display: inline-block; margin: 0 8px 4px 0; font-size: 9px;color: rgb(0, 160, 220);}
  .mitem{padding: 0 6px;border: 1px solid rgba(7, 17, 27, 0.1);border-radius: 1px;color: rgb(147, 153, 159); background: #fff;display: inline-block; margin: 0 8px 6px 0; font-size: 9px}
  .time{ position: absolute;top: 0;right: 0; line-height: 12px; font-size: 10px;color: rgb(147, 153, 159)}

</style>