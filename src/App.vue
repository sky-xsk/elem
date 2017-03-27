<template>
  <div id="app">
      <v-head1 :seller="seller"></v-head1>

      <div class="tab tab_bor">
          <div class="item_tab">
            <router-link to="/goods" class="tab_active">商品</router-link>
          </div>
           <div class="item_tab">
              <router-link to="/ratings" class="tab_active">评论</router-link>  
          </div>
           <div class="item_tab">
              <router-link to="/seller" class="tab_active">商家</router-link>
          </div>
      </div>

      <div class="content">
         <!--注意：这里使用了keep-alive后，会缓存不活动的组件实例，而不是销毁它们；简单的就这项目来说，当你在good组件添加商品后，
         然后点击其他组件后，然后再返回good组件，添加的商品还是存在的，这就说明已经缓存了，并没有随着组件的切换，将其销毁-->
         <keep-alive>
            <router-view :seller="seller"></router-view>
         </keep-alive>
         
      </div>
  </div>
</template>

<script>
    import head1 from './components/heads.vue';
    const ERR_OK = 0;
    export default {
        data() {
            return {
                seller: {}
            }
        },

        created() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = response.data;
                    console.log(this.seller)
                }
            });
        },

        components: {
            'v-head1': head1,
        },
        name: 'app'
    }
</script>

<style>
    @import '../static/css/reset.css';
    /*设置的dpi，1px的线，实现缩放的功能*/
    
    @media(-webkit-min-device-pixel-ratio:1.5),
    (min-device-pixel-ratio:1.5) {
        .tab_bor::after {
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }
    }
    
    @media(-webkit-min-device-pixel-ratio:2),
    (min-device-pixel-ratio:2) {
        .tab_bor::after {
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
    
    .tab {
        widows: 100%;
        display: flex;
        height: 40px;
        line-height: 40px;
        position: relative;
    }
    
    .tab:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        display: block;
        width: 100%;
    }
    
    .item_tab {
        flex: 1;
        text-align: center;
    }
    
    .tab_active {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
    }
    
    a.router-link-active {
        color: rgb(240, 20, 20);
    }
</style>