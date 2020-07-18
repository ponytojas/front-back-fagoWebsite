import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import "@/assets/style/tailwind.css";
import { VueSpinners } from "@saeris/vue-spinners";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";

Vue.use(VueSpinners);
Vue.component("v-icon", Icon);

Vue.config.productionTip = false;
Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
