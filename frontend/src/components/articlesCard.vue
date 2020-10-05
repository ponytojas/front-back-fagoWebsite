<template>
  <div class="fullCard">
    <ModalArticle
      v-model="modalOpen"
      :title="article.title"
      :subtitle="article.subtitle"
      :body="article.body"
      :tags="tags"
      :author="article.author"
      :date="dateToShow"
    />
    <a href="#" @click="openModal">
      <div class="border border-gray-500 rounded-sm pb-3 mb-5">
        <p
          class="text-xl sm:text-xl md:text-2xl lg:text-3xl text-green-500 pt-3 pb-1"
        >
          {{ article.title }}
        </p>
        <p class="text-lg text-green-700 pt-1 pb-3">{{ article.subtitle }}</p>
        <div class="text-base text-gray-800 pb-3 px-5" v-html="textPreview" />

        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="text-xs pt-3 pb-5"
          ><span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >#{{ tag }}</span
          >
        </span>
      </div>
    </a>
  </div>
</template>

<script>
import ModalArticle from "./modalArticleHome.vue";

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModalArticle,
  },
  data() {
    return {
      tags: [],
      modalOpen: false,
      textPreview: "",
      dateToShow: "",
    };
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
  beforeMount() {
    this.tags = this.article.tags;
    this.dateToShow = this.article.updated_at.slice(
      0,
      this.article.updated_at.indexOf("T")
    );
    this.textPreview =
      this.article.body.split(/\s+/).slice(0, 20).join(" ") + "...";
  },
};
</script>
<style scoped>
.fullCard {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fullCard:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
