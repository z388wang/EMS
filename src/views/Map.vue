<template>
  <div class="mapContainer">
    <van-icon
      class="backButton"
      name="arrow-left"
      size="25"
      @click.native="goBack"
    />
    <!-- <img src="../../public/img/googlemap.jpg" /> -->
    <GmapMap :center="{ lat: 10, lng: 10 }">
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        @click="center = m.position"
      />
    </GmapMap>
    <div class="luggageContainer">
      <van-card
        title="luggage.name"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.backButton {
  position: absolute;
  left: 20px;
  top: 20px;
}
.luggageContainer {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  overflow: hidden;
  border-radius: 10px;
}
.mapContainer {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
