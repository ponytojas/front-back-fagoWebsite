<template>
  <div>
    <img
      class="h-screen w-screen bg-cover"
      src="../assets/fago-background.png"
      style="
        position: fixed;
        z-index: 1;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
      "
      alt="Fago Background"
      srcset="
        ../assets/fago-background-xsmall.png  711w,
        ../assets/fago-background-small.png  1067w,
        ../assets/fago-background-medium.png 1778w,
        ../assets/fago-background-large.png  2666w
      "
      sizes="60vw"
    />
    <div
      class="flex justify-center align-middle h-screen"
      style="position: relative; z-index: 100;"
    >
      <div
        class="self-center w-auto h-auto py-12 px-12 card border-gray-500 border rounded-md grid grid-rows-4 grid-flow-col gap-4"
      >
        <div class="mt-5">
          <p class="sm:text-xl lg:text-2xl xl:text-3xl text-green-500">
            Login
          </p>
        </div>
        <div class="m-auto grid grid-cols-2">
          <p class="sm:text-lg lg:text-xl text-green-500 col-span-1">
            Username
          </p>
          <input
            class="col-span-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            v-model="username"
            type="text"
            v-on:keyup.enter="login"
          />
        </div>
        <div class="m-auto grid grid-cols-2">
          <p class="sm:text-lg lg:text-xl text-green-500 col-span-1">
            Password
          </p>
          <input
            class="col-span-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            id="password"
            autocomplete="password"
            v-model="password"
            type="password"
            v-on:keyup.enter="login"
          />
        </div>
        <div class="align-middle m-auto">
          <button
            class="shadow bg-green-500 hover:bg-green-400 sm:text-lg xl:text-xl focus:outline-none text-white py-1 px-2 sm:py-1 sm:px-2 xl:py-2 xl:px-4 rounded"
            type="button"
            @click="login"
            value="Login"
          >
            <span v-if="!loading">Login</span>
            <DotLoader color="#fafafa" v-bind:size="25" v-if="loading" />
          </button>
          <div>
            <p v-if="msg" :class="colorClass" class="text-xs m-auto">
              {{ msg }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService.js";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      msg: "",
      loading: false,
      colorClass: "text-red-600",
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        if (response.msg == "Logged in correctly!")
          this.colorClass = "text-green-600";
        const token = response.token;
        const user = response.user;
        await this.$store
          .dispatch("login", { token, user })
          .then(() => this.$router.push("admin"));
      } catch (error) {
        this.loading = false;
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fafafa;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
