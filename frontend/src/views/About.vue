<template>
  <div class="container mx-auto flex items-center">
    <form class="w-full mt-20">
      <div class="md:flex md:items-center mb-6">
        <div>
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Username
          </label>
        </div>
        <div>
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            id="inline-full-name"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div>
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-username"
          >
            Password
          </label>
        </div>
        <div>
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            id="inline-username"
            type="password"
            placeholder=""
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div></div>
        <div>
          <button
            class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped></style>
