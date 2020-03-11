<template>
  <div class="list">
    <van-nav-bar title="My Luggages" @click-right="newLuggage">
      <van-icon name="add-o" slot="right" size="25" />
    </van-nav-bar>
    <template v-if="allLuggages.length === 0">
      <p>You dont have any luggages</p>
    </template>
    <template v-else>
      <van-swipe-cell v-for="(luggage, index) in allLuggages" :key="index">
        <van-card
          :title="luggage.name"
          class="goods-card"
          thumb="https://img.yzcdn.cn/vant/cat.jpeg"
          @click.native="showMap"
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
    <van-dialog
      v-model="showAddNewLuggage"
      title="Add a new luggage"
      show-cancel-button
      @confirm="addNewLuggage"
    >
      <van-field
        v-model="newLuggageID"
        placeholder="Enter your luggage ID"
        type="digit"
      />
      <van-field
        v-model="newLuggageName"
        placeholder="Enter your luggage name"
      />
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
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
    addNewLuggage() {
      if (this.allLuggages.some(luggage => luggage.ID === this.newLuggageID)) {
        this.$notify({
          type: "danger",
          message: "ID already exists!"
        });
        return;
      }
      this.allLuggages.push({
        name: this.newLuggageName,
        ID: this.newLuggageID
      });
      this.newLuggageID = "";
      this.newLuggageName = "";
    },
    removeLuggage(index) {
      this.allLuggages.splice(index, 1);
      this._saveToLocal();
    },
    showMap() {
      this.$router.push("map");
    }
  }
};
</script>

<style scoped lang="scss"></style>
