<template>
  <div>
    <p class="text-xl">{{ text }}</p>
    <v-icon :class="color" scale="3"  :name="icon" />
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
  data() {},
  methods: {},
};
</script>
