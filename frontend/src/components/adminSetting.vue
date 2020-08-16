<template>
  <div class="border rounded-md card">
    <v-icon :class="color" class="pt-3" scale="3" :name="icon" />
    <p class="text-xl pt-3 pb-3">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    color: String,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
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
