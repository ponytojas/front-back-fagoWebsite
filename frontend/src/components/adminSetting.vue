<template>
  <a href="#">
    <div class="border rounded-md">
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
  },
  components: {},
  data() {return {}},
  methods: {},
};
</script>
