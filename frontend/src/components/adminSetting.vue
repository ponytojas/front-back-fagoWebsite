<template>
  <a href="#" class="card">
    <div class="border rounded">
      <v-icon :class="color" class="pt-3" scale="3" :name="icon" />
      <p class="text-xl pt-3 pb-3">{{ text }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    color: String,
    users: Boolean,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
