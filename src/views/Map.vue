<template>
  <div class="mapContainer">
    <keep-alive>
      <div id="googlemap">
        <van-loading class="loading" type="spinner" size="24px">Loading Map</van-loading>
      </div>
    </keep-alive>
    <van-button round class="backButton" icon="arrow-left" type="info" @click="goBack">Back</van-button>
    <div class="luggageContainer">
      <card :name="luggage.name" :id="luggage.ID" :color="luggage.color" />
    </div>
  </div>
</template>

<script>
// import gmapsInit from "../views/gmaps";
import Card from "@/components/Card";
import { mapGetters } from "vuex";

export default {
  name: "MapPage",
  components: {
    Card
  },
  computed: {
    ...mapGetters({ luggage: "selectedLuggage" })
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getGeolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position =>
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }),
          err => reject(err)
        );
      });
    },
    async initGoogleMap() {
      try {
        const google = window.google;
        const currentLocation = await this.getGeolocation();
        const geocoder = new google.maps.Geocoder();
        const map = new google.maps.Map(document.querySelector("#googlemap"), {
          zoom: 14,
          disableDefaultUI: true,
          center: currentLocation
        });
        new google.maps.Marker({
          position: currentLocation,
          map
        });
        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition(currentLocation);

        geocoder.geocode({ location: currentLocation }, (results, status) => {
          if (status !== "OK" || !results[0]) {
            this.$notify({
              type: "warning",
              message: "Failed to decode location"
            });
          }
          infoWindow.setContent("Near: " + results[0].formatted_address);
          infoWindow.open(map);
        });
      } catch (error) {
        this.$notify({
          type: "danger",
          message: `Failed to load Google Map\n${error.toString()}`
        });
      }
    }
  },
  mounted() {
    setTimeout(this.initGoogleMap, 2000);
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
  padding-bottom: 20px;
  background: white;
}
.mapContainer {
  background: #f7f8fa;
  .backButton {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  #googlemap {
    height: 100%;
    width: 100%;
    .loading {
      position: absolute;
      top: 0;
      bottom: 100px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
