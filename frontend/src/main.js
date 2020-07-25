import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import "@/assets/style/tailwind.css";
import { VueSpinners } from "@saeris/vue-spinners";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import Nl2br from "vue-nl2br";

Vue.component("nl2br", Nl2br);

Vue.use(VueSpinners);
Vue.component("v-icon", Icon);
Vue.use(Autocomplete);

Vue.config.productionTip = false;
Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
