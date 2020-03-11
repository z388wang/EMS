<template>
  <div id="login">
    <div class="login">
      <h4>Locate your EMS</h4>
      <van-form class="login__form" @submit="onSubmit">
        <van-field
          left-icon="user-o"
          class="username"
          v-model="username"
          name="username"
          placeholder="Enter your username"
          :rules="[{ required: true, message: 'Please enter your username' }]"
        />
        <van-field
          left-icon="https://cdn.onlinewebfonts.com/svg/img_376352.png"
          class="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          :rules="[{ required: true, message: 'Please enter your password' }]"
        />
        <van-checkbox v-model="remember" style="margin: 16px 0;">
          Remember me
        </van-checkbox>
        <van-button round block type="info" native-type="submit">
          Login
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      remember: true
    };
  },
  methods: {
    onSubmit(values) {
      const { username, password } = values;
      if (username === "admin" && password === "password") {
        this.login();
        return this.$router.push("list");
      }
      Toast({
        message: "Login failed",
        icon: "close"
      });
    },
    ...mapMutations(["login"])
  }
};
</script>

<style scoped lang="scss">
#login {
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 100%;
    &__form {
      margin: 0 20px;
      .username,
      .password {
        border: 1px solid grey;
        border-radius: 12px;
      }
      .password {
        margin-top: 10px;
      }
    }
  }
  .login__form {
    margin: 20px;
    .username,
    .password {
      border: 1px solid grey;
      border-radius: 12px;
    }
    .password {
      margin-top: 10px;
    }
  }
}
</style>
