<template>
  <div class="w-screen h-screen bg-yellow-400 absolute overflow-auto">
    <div class="flex justify-center align-middle h-full bg-yellow-400 relative">
      <div class="mt-12 h-full w-9/12 mb-12 bg-white px-4">
        <div class="grid grid-cols-6 gap-1 mt-10 mb-10">
          <p class="col-span-2 text-2xl">Título del artículo</p>
          <input
            v-model="title"
            placeholder="Título"
            class="border-black border-2 w-9/12 p-2 mb-4 col-span-4"
          />
        </div>
        <div class="grid grid-cols-6 gap-1 mt-10 mb-10">
          <p class="col-span-2 text-2xl">Subtítulo del artículo</p>
          <input
            v-model="subtitle"
            placeholder="Título"
            class="border-black border-2 w-9/12 p-2 mb-4 col-span-4"
          />
        </div>
        <vue-editor
          v-model="content"
          class="bg-white border-black border-2 mx-16"
          :editorOptions="editorOptions"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
        />
        <div class="flex justify-center w-full">
          <multiselect
            id="multiselect"
            class="mt-10 max-w-screen-xl"
            v-model="tags"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            label="tag_name"
            track-by="tag_name"
            placeholder="Selecciona o añade una etiqueta"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import Emoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
import axios from "axios";
import Multiselect from "vue-multiselect";

Quill.register(
  {
    "formats/emoji": Emoji.EmojiBlot,
    "modules/short_name_emoji": Emoji.ShortNameEmoji,
    "modules/toolbar_emoji": Emoji.ToolbarEmoji,
    "modules/textarea_emoji": Emoji.TextAreaEmoji,
  },
  true
);

const editorOptions = {
  modules: {
    "emoji-shortname": {
      fuse: {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 200,
      },
    },
    toolbar: {
      container: [
        [{ size: ["small", false, "large"] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
        ["emoji"],
      ],
      handlers: {
        emoji: function () {},
      },
    },
    toolbar_emoji: true,
  },
};

export default {
  components: {
    VueEditor,
    Multiselect,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
      file: "",
      title: "",
      subtitle: "",
      options: [],
      tags: [],
    };
  },
  async beforeMount() {
    await axios.get("http://localhost:3000/tags").then(async (response) => {
      this.options = await JSON.parse(JSON.stringify(response.data));
    });
  },
  computed: { editorOptions: () => editorOptions },
  methods: {
    async addTag(newTag) {
      let tag_id;
      await axios
        .post("http://localhost:3000/tags", { tag_name: newTag })
        .then(async (response) => {
          tag_id = await JSON.parse(JSON.stringify(response.data.uuid_tag));
        });
      const tag = {
        tag_name: newTag,
        tag_id: tag_id,
      };
      this.options.push(tag);
      this.tags.push(tag);
    },

    handleImageAdded: function (file, Editor, cursorLocation) {
      console.log("Inserting image to server");
      this.file = file;

      let formData = new FormData();
      formData.append("editor-image", this.file); // appending file

      // sending file to the backend
      axios
        .post("http://localhost:3000/editor-images", formData)
        .then((res) => {
          console.log(res.data);
          let url = res.data;
          Editor.insertEmbed(
            cursorLocation,
            "image",
            "http://localhost:3000" + url
          );
          this.insertImageWidth(url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    insertImageWidth(fileUploaded) {
      this.content = this.content.replace(
        fileUploaded + '"',
        fileUploaded + '" width="500"'
      );
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
//Editor, cursorLocation, resetUploader
<style scoped>
#multiselect {
  width: 90% !important;
  max-width: 90% !important;
}
.bem {
  margin: 8px !important;
}
</style>
