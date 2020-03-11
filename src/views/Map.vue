<template>
  <div class="mapContainer">
    <van-button
      round
      class="backButton"
      icon="arrow-left"
      type="info"
      @click="goBack"
    >
      Back
    </van-button>
    <div class="luggageContainer">
      <card
        :name="luggage.name"
        :id="luggage.ID"
        image="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapGetters } from "vuex";

export default {
  components: {
    Card
  },
  computed: {
    ...mapGetters({ luggage: "selectedLuggage" })
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.luggageContainer {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  overflow: hidden;
  border-radius: 10px;
}
.mapContainer {
  .backButton {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
