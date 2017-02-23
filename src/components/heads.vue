<template>
  <div id="heads">
      <div class="content-warpper">
          
          <!--获取头像-->
          <div class="avatar">
              <img width="64" height="64" :src="seller.avatar">
          </div>

          <div class="contonts">
              <div class="title">
                   <span class="brand"></span>
                   <span class="name">{{seller.name}}</span> 
              </div>
              <div class="description">
                  {{seller.description}}/{{seller.deliveryTime}}分钟送达！
              </div>

              <div v-if="seller.supports" class="support">
                  <span class="icons"></span>
                  <span class="texts">{{seller.supports[0].description}}</span>
              </div>
          </div>
          <div class="support-count" v-if="seller.supports" @click="showdetail">
              <span class="count">{{seller.supports.length}}个
                  <i>></i>
              </span>
          </div>
      </div>
       <div class="bulletion-warpper"  @click="showdetail">
           <span class="bulletion-title"></span><span class="bulletion-text">{{seller.bulletin}}</span>
           <i>></i>
      </div>
      <div class="background">
          <img :src="seller.avatar" width="100%" height="100%">
      </div>

      <!--浮层-->
      <transition name="fade">
      <div class="detail" v-show="detailshow" transition="fade" >
          <div class="detail-wrapper clearfix">
               <div class="detail_main">
                   <h1 class="name">{{seller.name}}</h1>
                   <star class="starts"></star> 

                   <div class="titlre">
                       <div class="line"></div>
                       <div class="text">优惠信息</div>
                       <div class="line"></div>
                   </div>

                    <div class="cvs">
                        <p>{{seller.bulletin}}</p>
                   </div>

                     <div class="titlre">
                       <div class="line"></div>
                       <div class="text">商家公告</div>
                       <div class="line"></div>
                   </div> 

                    <div class="cvs">
                        <p>{{seller.bulletin}}</p>
                   </div>

               </div>
          </div>
        <div class="detail_close" @click="guan">
              <i>X</i>
          </div>
      </div>
 </transition>

  </div>
</template>

<script>
    import star from './star/star.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star
        },
        data() {
            return {
                detailshow: false
            }
        },
        methods: {
            showdetail() {
                this.detailshow = true
            },
            guan() {
                this.detailshow = false
            }

        },
        created() {

        },
    }
</script>

<style>
    @import '../../static/css/base.css';
    .cv li {
        text-align: center;
        line-height: 30px;
    }
    
    .cvs {
        width: 80%;
        margin: 0 auto;
        padding-left: 12px;
        padding-right: 12px;
        line-height: 24px;
    }
    
    .titlre {
        width: 80%;
        margin: 30px auto 24px auto;
        display: flex;
    }
    
    .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .text {
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
    }
    
    .name {
        text-align: center;
    }
    
    .starts {
        margin-top: 16px;
    }
    
    .clearfix {
        display: inline-block;
    }
    
    .clearfix:after {
        display: block;
        content: '';
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    
    .detail-wrapper {
        min-height: 100%;
        width: 100%;
    }
    
    .detail_main {
        margin-top: 64px;
        padding-bottom: 64px;
        font-size: 14px;
    }
    
    .detail_close {
        position: relative;
        width: 32px;
        height: 32px;
        padding-top: 20px;
        margin: -64px auto 0 auto;
        clear: both;
    }
    
    .detail_close i {
        font-style: normal;
        font-size: 24px;
    }
    /*-----------------------------------------------*/
    
    #heads {
        color: #fff;
        position: relative;
        background: rgba(7, 17, 27, 0.5);
        overflow: hidden;
    }
    
    .content-warpper {
        padding: 24px 12px 18px 24px;
        font-size: 0px;
        position: relative;
    }
    
    .avatar {
        display: inline-block;
        vertical-align: top;
    }
    
    .avatar img {
        border-radius: 2px;
    }
    
    .contonts {
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
    }
    
    .title {
        margin: 2px 0 8px, 0;
    }
    
    .brand {
        width: 30px;
        height: 18px;
        display: inline-block;
        background-image: url('images/brand@2x.png');
        background-size: 30px 18px;
        background-repeat: no-repeat;
        vertical-align: top;
    }
    
    .name {
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
    }
    
    .description {
        margin-block-start: 10px;
        line-height: 12px;
        font-size: 12px;
    }
    
    .support {
        margin-top: 10px;
        font-size: 10px;
    }
    
    .support .icons {
        display: inline-block;
        margin-right: 4px;
        width: 12px;
        height: 12px;
        background: url('images/decrease_1@2x.png');
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: middle;
    }
    
    .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
    }
    
    .count {
        font-size: 12px;
        display: inline-block;
        vertical-align: top;
    }
    
    .bulletion-warpper {
        height: 28px;
        line-height: 26px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        background: rgba(7, 17, 27, 0.2)
    }
    
    .bulletion-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        background: url('images/bulletin@2x.png');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        vertical-align: middle;
    }
    
    .bulletion-text {
        font-size: 10px;
        margin-left: 4px;
    }
    
    .bulletion-warpper i {
        position: absolute;
        right: 12px;
        font-size: 10px;
        top: 4px;
    }
    
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    
    .detail {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        top: 0;
        left: 0;
        transition: all 0.1s;
        background-filter: blur(10px);
        background: rgba(7, 17, 27, 0.8);
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5;
        transform: scaleX(0.2);
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
        transform: scaleX(0);
    }
</style>