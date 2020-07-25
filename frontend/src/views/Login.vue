<template>
  <div
    class="h-full w-full -mx-px bg-cover -px-1"
    :style="{
      'background-image': 'url(https://ponytojas.dev/login-background.png)',
    }"
  >
    <div
      class="container mx-auto p-64 flex justify-center align-middle h-screen"
    >
      <form class="w-full max-w-xl" @keyup.native.enter="login">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/4"></div>
          <div class="md:w-3/4">
            <p class="text-4xl antialiased text-gray-800">
              Enter your credentials
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/4">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="username"
              >Username</label
            >
          </div>
          <div class="md:w-3/4">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
              id="username"
              v-model="username"
              type="text"
              v-on:keyup.enter="login"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/4">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="password"
              >Password</label
            >
          </div>
          <div class="md:w-3/4">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
              id="password"
              autocomplete="password"
              v-model="password"
              type="password"
              v-on:keyup.enter="login"
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/4"></div>
          <div class="md:w-3/4">
            <button
              class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded"
              type="button"
              @click="login"
              value="Login"
            >
              <span v-if="!loading">Login</span>
              <DotLoader
                class="flex flex-col items-center justify-center py-2 px-4"
                color="#fafafa"
                size="25"
                v-if="loading"
              />
            </button>
          </div>
        </div>
        <div class="md:flex md:items-center mt-5">
          <div class="md:w-1/4"></div>
          <div class="md:w-3/4">
            <p v-if="msg" :class="colorClass">{{ msg }}</p>
          </div>
        </div>
      </form>
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
          .then(() => this.$router.push("/admin"));
      } catch (error) {
        this.loading = false;
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

<style scoped></style>
