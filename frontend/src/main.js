import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import "./assets/style/tailwind.css";
import "./assets/style/material-icon.css";
import { VueSpinners } from "@saeris/vue-spinners";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import Nl2br from "vue-nl2br";
import Toasted from "vue-toasted";

Vue.component("nl2br", Nl2br);

Vue.use(VueSpinners);
Vue.use(Autocomplete);
Vue.use(Toasted);

Vue.config.productionTip = false;
Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
