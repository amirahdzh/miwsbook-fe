<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <Icon icon="mdi:close" />
      </button>
      <h2 class="text-2xl font-bold mb-4">Search Books</h2>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search books..."
        class="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />

      <button
        @click="searchBooks"
        class="bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-teal-600"
      >
        Search
      </button>

      <ul class="mt-4">
        <li v-for="book in filteredBooks" :key="book.id" class="border-b py-2">
          <a
            @click="selectBook(book)"
            class="cursor-pointer hover:text-teal-600"
            >{{ book.title }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getBooks } from "../services/bookService";
import { Icon } from "@iconify/vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close", "select"]);

const searchQuery = ref("");
const books = ref([]);
const filteredBooks = computed(() => {
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchBooks = async () => {
  try {
    const response = await getBooks();
    books.value = response.data;
  } catch (err) {
    console.error("Failed to fetch books:", err);
  }
};

const searchBooks = () => {
  // Trigger search when user clicks the button
};

const selectBook = (book) => {
  emit("select", book);
  emit("close");
};

const close = () => {
  emit("close");
};

fetchBooks();
</script>

<style scoped>
/* Add any additional styling here */
</style>
