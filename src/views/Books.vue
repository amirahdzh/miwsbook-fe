<script setup>
import { ref, onMounted } from "vue";
import { getBooks, searchBooks } from "../services/bookService";
import Spinner from "../components/Spinner.vue";
import { Icon } from "@iconify/vue";

const books = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');

const fetchBooks = async (query = '') => {
  try {
    loading.value = true;
    const response = query ? await searchBooks(query) : await getBooks();
    books.value = response.data;
  } catch (err) {
    error.value = "Failed to load books.";
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  fetchBooks(searchQuery.value);
};

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="mt-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 mb-20">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary">Books Collection</h1>
      <!-- <p class="text-lg text-gray-600">Browse our collection of books</p> -->
    </div>

    <!-- Search Bar -->
    <div class="flex justify-center mb-8">
      <div class="relative flex-grow max-w-lg">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search books..."
          class="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
          @click="handleSearch"
        >
          <Icon icon="mdi:magnify" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Loading and Error Handling -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <Spinner />
    </div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

    <!-- Books Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
    >
      <!-- Book Cover -->
      <div
        v-for="book in books"
        :key="book.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
      >
        <div class="aspect-w-16 aspect-h-10">
          <RouterLink :to="`/book/${book.id}`">
            <img
              :src="book.image"
              :alt="book.title"
              class="w-full h-full object-cover"
            />
          </RouterLink>
        </div>
        <!--
        <div class="p-2 md:p-4">
          <h2 class="text-sm md:text-md font-bold text-center text-dark">
            {{ book.title }}
          </h2>
        </div> -->
      </div> 
      <!-- End Book Cover -->
    </div>
  </div>
</template>

<style scoped>
.aspect-w-16 {
  width: 100%;
  padding-bottom: 140%; /* 16:10 aspect ratio */
  position: relative;
}

.aspect-w-16 img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

</style>
