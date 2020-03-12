<template>
  <div class="luggage">
    <div class="img">
      <div class="color-bg" :style="{ background: color }"></div>
      <img src="@/assets/suitcase.png" alt="A luggage image" />
    </div>
    <div class="content">
      <span class="name">{{ name }}</span>
      <span class="id">ID: {{ id }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    color: {
      type: String,
      default: "#f44336"
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
$image-size: 100px;
$image-bg-padding: 15px;
.luggage {
  height: $image-size;
  display: flex;
  background: white;
  .img {
    position: relative;
    width: $image-size;
    .color-bg {
      position: absolute;
      top: $image-bg-padding;
      right: $image-bg-padding;
      left: $image-bg-padding;
      bottom: $image-bg-padding;
      background: cadetblue;
      border-radius: ($image-size - $image-bg-padding) / 2;
    }
    img {
      position: absolute;
      top: $image-bg-padding;
      left: $image-bg-padding;
      height: $image-size - $image-bg-padding * 2;
      width: $image-size - $image-bg-padding * 2;
      overflow: hidden;
      object-fit: cover;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .content {
    box-sizing: border-box;
    padding: $image-bg-padding + 5px 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: start;
    justify-content: space-between;
    .name {
      font-size: 20px;
    }
    .id {
      color: #616161;
    }
  }
}
</style>
