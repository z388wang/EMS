<template>
  <div class="luggage">
    <img :src="image" alt="A luggage image" />
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
    image: {
      type: String,
      required: true
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
.luggage {
  height: $image-size;
  display: flex;
  background: white;
  img {
    border-radius: 15px;
    height: $image-size;
    width: $image-size;
    overflow: hidden;
    object-fit: cover;
    padding: 10px;
    box-sizing: border-box;
  }
  .content {
    box-sizing: border-box;
    padding: 10px;
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
