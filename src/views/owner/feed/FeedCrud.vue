<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Feeds</h1>

    <!-- Add Feed Button -->
    <button
      @click="openAddModal"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4 flex items-center sm:space-x-2"
    >
      <Icon icon="mdi:plus" class="w-4 h-4" />
      <span class="hidden sm:inline">Add Feed</span>
    </button>

    <!-- Feed List -->
    <div class="mb-6">
      <h2 class="text-xl mb-2">Feed List</h2>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">Content</th>
            <th class="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feed in feeds" :key="feed.id">
            <td class="py-2 px-4 border-b text-left">
              <div v-html="feed.content"></div>
              <!-- Render HTML -->
            </td>
            <td class="py-2 px-4 border-b text-left">
              <button
                @click="editFeed(feed)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                <Icon icon="mdi:pencil" class="w-4 h-4" />
              </button>
              <button
                @click="confirmDelete(feed)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                <Icon icon="mdi:delete" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Feed Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-xl mb-4">Add Feed</h2>
        <form @submit.prevent="submitFeed">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Content</label
            >
            <QuillEditor v-model="newFeed.content" theme="snow" />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeAddModal"
              class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import QuillEditor from "vue3-quill";
import "quill/dist/quill.snow.css";

const feeds = ref([
  { id: 1, content: "<p><b>Sample Feed:</b> Hello <i>world</i>!</p>" },
]);

const newFeed = ref({ content: "" });
const showAddModal = ref(false);

const openAddModal = () => {
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const submitFeed = () => {
  if (newFeed.value.content.trim()) {
    feeds.value.push({
      id: feeds.value.length + 1,
      content: newFeed.value.content,
    });
    newFeed.value.content = "";
    closeAddModal();
  }
};
</script>

<style scoped>
/* Custom styling if needed */
</style>
