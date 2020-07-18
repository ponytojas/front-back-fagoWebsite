<template>
  <div class="container w-screen align-top h-screen p-16">
    <div class="bg-white border w-full rounded-lg p-6 align-top">
      <p class="text-2xl">Panel de administración</p>
      <hr class="w-3/4 m-auto mt-2" />
      <div class="grid grid-cols-3 gap-4 mt-4">
        <AdminSetting icon="plus-square" text="Registrar usuario" color="text-green-600" />
        <div>5</div>
        <div>9</div>
      </div>
    </div>
  </div>
</template>

<script>
    import AdminSetting from '../components/adminSetting'

    export default {
        name: "Login",
          components: {
              AdminSetting
          },
        data() {
            return {
                username: "",
                password: "",
                msg: "",
                loading: false
            };
        },
        methods: {}
    };
</script>

<style scoped></style>
