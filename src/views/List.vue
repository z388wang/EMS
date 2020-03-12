<template>
  <div class="list">
    <van-nav-bar
      left-text="log out"
      left-arrow
      title="My Luggages"
      @click-right="newLuggage"
      @click-left="logOut"
    >
      <van-icon name="add-o" slot="right" size="25" />
    </van-nav-bar>
    <van-pull-refresh class="list-content" v-model="isLoading" @refresh="onRefresh">
      <template v-if="allLuggages.length === 0">
        <div class="no-data">
          You don't have any luggage registered
          <br />Add a luggage through the top right button
        </div>
      </template>
      <template v-else>
        <van-swipe-cell class="swipe" v-for="(luggage, index) in allLuggages" :key="index">
          <card
            @click.native="showMap(index)"
            :color="luggage.color"
            :name="luggage.name"
            :id="luggage.ID"
          />
          <van-button
            slot="right"
            text="DELETE"
            type="danger"
            class="delete-button"
            @click="removeLuggage(index)"
          />
        </van-swipe-cell>
      </template>
    </van-pull-refresh>
    <van-dialog
      v-model="showAddNewLuggage"
      title="Add a new luggage"
      show-cancel-button
      @confirm="addNewLuggage"
    >
      <div class="new-luggage">
        <van-field
          class="new-luggage__ID"
          v-model="newLuggageID"
          placeholder="Enter a new luggage ID"
          type="digit"
        />
        <van-field
          class="new-luggage__name"
          v-model="newLuggageName"
          placeholder="Enter a new luggage name"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      allColors: ["#f44336", "#673AB7", "#03A9F4"],
      isLoading: false,
      allLuggages: [],
      showAddNewLuggage: false,
      newLuggageID: "",
      newLuggageName: ""
    };
  },
  created() {
    const savedLuggages = localStorage.getItem("allLuggages");
    if (savedLuggages) {
      this.allLuggages = JSON.parse(savedLuggages);
    }
  },
  beforeDestroy() {
    this._saveToLocal();
  },
  methods: {
    _saveToLocal() {
      localStorage.setItem("allLuggages", JSON.stringify(this.allLuggages));
    },
    newLuggage() {
      this.showAddNewLuggage = true;
    },
    logOut() {
      this.logout();
      this.$router.push("login");
    },
    addNewLuggage() {
      if (this.allLuggages.some(luggage => luggage.ID === this.newLuggageID)) {
        this.$notify({
          type: "danger",
          message: "ID already exists!"
        });
      } else if (
        this.newLuggageID !== "813735247414" &&
        this.newLuggageID !== "813735247415"
      ) {
        this.$notify({
          type: "danger",
          message: "No ID matches!"
        });
      } else {
        this.allLuggages.push({
          color: this.allColors[(this.allLuggages.length + 1) % 3],
          name: this.newLuggageName,
          ID: this.newLuggageID
        });
      }
      this.newLuggageID = "";
      this.newLuggageName = "";
    },
    removeLuggage(index) {
      this.allLuggages.splice(index, 1);
      this._saveToLocal();
    },
    showMap(index) {
      this.setLuggage(this.allLuggages[index]);
      this.$router.push("map");
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("Refresh success");
        this.isLoading = false;
      }, Math.random() * 2000);
    },
    ...mapMutations(["setLuggage", "logout"])
  }
};
</script>

<style scoped lang="scss">
.list {
  background: #f7f8fa;
  height: 100%;
}
.no-data {
  margin: 20px;
}
.swipe + .swipe {
  margin-top: 2px;
}
.delete-button {
  height: 100%;
  border-radius: 0px;
}
.new-luggage {
  margin: 20px 0;
  &__ID,
  &__name {
    border: 1px solid grey;
    border-radius: 12px;
    margin: 10px 20px;
    width: calc(100% - 40px);
  }
}
</style>
