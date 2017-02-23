<template>
  <div id="star">
      <el-rate
        v-model="sellers"
        disabled
        show-text
        text-color="#ff9900"
        text-template="{value}">
     </el-rate>
  </div>
</template>

<script>
    const ERR_OK = 0;
    export default {
        data() {
            return {
                sellers: 0,
            }
        },
        created() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = response.data;
                    this.sellers = this.seller.score;
                }
            });
        },
    }
</script>

<style>
    #star {
        color: #fff;
        text-align: center;
    }
</style>