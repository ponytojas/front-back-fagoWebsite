<template>
  <div class="container w-screen align-top h-screen p-16">
    <div class="bg-white border w-full rounded-lg p-6 align-top">
      <p class="text-4xl">Panel de administración</p>
      <hr class="w-3/4 m-auto mt-2" />
      <p class="text-2xl mt-8 pb-1">Control de usuario</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  methods: {
    beforeMount() {
      console.log(`this.$el doesn't exist yet, but it will soon!`);
    },
  },
};
</script>

<style scoped></style>
