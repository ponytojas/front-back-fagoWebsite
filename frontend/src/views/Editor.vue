<template>
  <div class="w-screen h-screen bg-yellow-400 absolute overflow-auto">
    <div class="flex justify-center align-middle h-auto bg-yellow-400 relative">
      <div class="mt-12 h-full w-9/12 mb-12 bg-white px-4">
        <div class="grid grid-cols-6 gap-1 mt-10 mb-10 ml-16">
          <p class="col-span-1 text-xl">Título del artículo</p>
          <input
            v-model="title"
            placeholder="Título"
            class="border-black border w-11/12 p-2 mb-4 col-span-5 rounded"
          />
        </div>
        <div class="grid grid-cols-6 gap-1 mt-10 mb-10 ml-16">
          <p class="col-span-1 text-xl">Subtítulo del artículo</p>
          <input
            v-model="subtitle"
            placeholder="Subtítulo"
            class="border-black border w-11/12 p-2 mb-4 col-span-5 rounded"
          />
        </div>
        <vue-editor
          v-model="content"
          class="bg-white border-black border mx-16"
          :editorOptions="editorOptions"
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
        <div class="flex justify-center w-full mb-10">
          <gifSearch
            apiKey="tOABssXIdHe3QlBdR0TSMB0aGdH8a6PW"
            @clicked="onClickGIF"
            class="mt-10"
          />
        </div>
        <div class="flex justify-center w-full mb-10">
          <star-rating
            v-model="rating"
            :max-rating="3"
            :show-rating="false"
          ></star-rating>
        </div>
        <div class="flex justify-center w-full mb-10">
          <input
            type="file"
            accept="image/*"
            @change="uploadImage($event)"
            id="file-input"
          />
        </div>
        <div class="grid grid-cols-8 gap-2 mt-10 mb-10 ml-16">
          <div class="col-span-2" />
          <button
            class="shadow col-span-1 h-auto w-auto bg-green-500 hover:bg-green-400 sm:text-lg focus:outline-none text-white rounded"
            type="button"
            @click="onClickCreate"
          >
            Crear artículo
          </button>
          <div class="col-span-2" />
          <button
            class="shadow col-span-1 h-auto w-auto bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent sm:text-lg rounded"
            type="button"
            @click="onClickCancel"
          >
            Cancelar
          </button>
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
import gifSearch from "vue-gif-search";
import StarRating from "vue-star-rating";

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
        ["link", "video"],
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
    StarRating,
    Multiselect,
    gifSearch,
  },
  data() {
    return {
      content: "",
      title: "",
      subtitle: "",
      options: [],
      tags: [],
      rating: 1,
    };
  },
  async beforeMount() {
    await axios.get("http://localhost:3000/tags").then(async (response) => {
      this.options = await JSON.parse(JSON.stringify(response.data));
    });
  },
  computed: { editorOptions: () => editorOptions },
  methods: {
    async uploadImage(event) {
      const URL =
        "https://api.imgbb.com/1/upload?key=" + process.env.VUE_APP_BB_KEY;

      let data = new FormData();
      data.append("image", event.target.files[0]);

      let config = {
        url: URL,
        method: "post",
        data: data,
      };

      axios(config)
        .then(function (response) {
          this.content =
            this.content +
            "<img src='" +
            response.dadta.url +
            "' class='w-1/2 sm:w-auto block mx-auto' />";
        })
        .catch(function (error) {
          console.log(error);
        });
    },

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

    onClickGIF(value) {
      this.content =
        this.content +
        "<img src='" +
        value +
        "' class='w-1/2 sm:w-auto block mx-auto' />";
    },

    async onClickCreate() {
      this.$swal({
        title: "¿Estás seguro?",
        text: "Esto enviará el artículo para guardarlo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, envíalo",
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.$swal("¡Enviando!", "Espera unos segundos", "success");
          let body = {
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            tags: this.tags,
            rating: this.rating,
          };
          await axios.post("http://localhost:3000/article-new", body);
        }
      });
    },

    onClickCancel() {
      this.$router.push("admin");
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
//Editor, cursorLocation, resetUploader
<style>
.bem {
  margin: 8px !important;
}
</style>
