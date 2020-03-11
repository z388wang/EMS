
<template>
  <div class="mapContainer">
    <div id="googlemap"></div>
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
import gmapsInit from '../views/gmaps';
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
  },
  name: 'googleMap',
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.querySelector("#googlemap"), {
          zoom: 4,
          center: {lat: 43.471379, lng: -80.542099},
          disableDefaultUI: true
      });
      const locations = [
        {
          position: {
            lat: 43.471379,
            lng: -80.542099,
          },
        },
      ];

      geocoder.geocode({ address: 'Centre for Environmental and Information Technology, waterloo' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
      locations.map(x => new google.maps.Marker({ ...x, map }));
    } catch (error) {
      // console.error(error);
    }
  }
};
</script>

<style scoped lang="scss">
.luggageContainer {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  z-index: 999;
}
.mapContainer {
  .backButton {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  #googlemap{
    height: 100%;
    width: 100%;
  }
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
