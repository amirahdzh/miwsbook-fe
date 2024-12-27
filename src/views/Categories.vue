<template>
  <div class="mt-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 mb-20">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary">Categories</h1>
    </div>

    <!-- Tabs (Responsive) -->
    <div class="flex flex-wrap justify-center mb-8 gap-2">
      <button
        @click="filterBooks('all')"
        :class="['px-4 py-2', selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700']"
        class="rounded-lg max-w-xs"
      >
        All
      </button>
      <button
        v-for="category in filteredCategories"
        :key="category.id"
        @click="filterBooks(category.id)"
        :class="['px-4 py-2', selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700']"
        class="rounded-lg max-w-xs"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Loading and Error Handling -->
    <Spinner v-if="loading" class="text-center" />
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
      </div>
      <!-- End Book Cover -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCategories, getBooksByCategory } from '../services/categoryService';
import { getBooks } from '../services/bookService';
import Spinner from '../components/Spinner.vue';

const categories = ref([]);
const books = ref([]);
const selectedCategory = ref('all');
const loading = ref(true);
const error = ref(null);

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (err) {
    error.value = "Failed to load categories.";
    console.error("Error fetching categories:", err);
  } finally {
    loading.value = false;
  }
};

const fetchBooks = async (categoryId) => {
  try {
    if (categoryId === 'all') {
      const response = await getBooks();
      books.value = response.data;
    } else {
      const response = await getBooksByCategory(categoryId);
      books.value = response.data;
    }
  } catch (err) {
    error.value = "Failed to load books.";
    console.error("Error fetching books:", err);
  } finally {
    loading.value = false;
  }
};

const filterBooks = (categoryId) => {
  selectedCategory.value = categoryId;
  loading.value = true;
  fetchBooks(categoryId);
};

const filteredCategories = computed(() =>
  categories.value.filter(category => category.name !== 'No Category')
);

onMounted(() => {
  fetchCategories();
  filterBooks('all');
});
</script>

<style scoped>
/* Ensure the tabs wrap properly and have a maximum width */
.flex-wrap {
  flex-wrap: wrap;
}

/* Limit the maximum width of the buttons to prevent them from getting too large */
button {
  max-width: 150px; /* Adjust as necessary */
}

/* Aspect ratio of 16:10 */
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
