<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="Username"
        placeholder="Username"
        :rules="[{ required: true, message: 'Please enter your username' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        :rules="[{ required: true, message: 'Please enter your password' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          Login
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      const { username, password } = values;
      if (username === "admin" && password === "password") {
        return this.$router.push("list");
      }
      Toast({
        message: "Login failed",
        icon: "close"
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
