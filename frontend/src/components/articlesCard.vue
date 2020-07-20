<template>
  <a href="#">
    <div class="border rounded-md pb-3 mb-5">
      <p class="text-xl pt-3 pb-3">{{ article.title }}</p>
      <p class="text-xl pt-3 pb-3">{{ article.subtitle }}</p>
      <span v-for="(tag, index) in tags" :key="index" class="text-xs pt-3 pb-5"
        >· {{ tag }} //
      </span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      tags: [],
    };
  },
  methods: {},
  beforeMount() {
    console.log(this.article.tags);
    this.tags = this.article.tags;
  },
};
</script>
