import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Locale } from "vant";
import enUS from "vant/lib/locale/lang/en-US";
import "./registerServiceWorker";
import "./assets/reset.css";
import "vant/lib/index.css";

Locale.use("en-US", enUS);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
