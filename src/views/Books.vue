<script setup>
import { ref, onMounted, computed } from "vue";
import { getBooks, searchBooks } from "../services/bookService";
import { getCategories, getBooksByCategory } from "../services/categoryService";
import Spinner from "../components/Spinner.vue";
import { Icon } from "@iconify/vue";

const defaultBookImage = "/img/alkemis.jpg"; // Path gambar default
const books = ref([]);
const categories = ref([]);
const selectedCategory = ref("all");
const searchQuery = ref("");
const loading = ref(true);
const error = ref(null);
// Debounce and last-request key to avoid duplicate calls
let searchDebounceTimeout = null;
const lastFetchKey = ref("");

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (err) {
    error.value = "Failed to load categories.";
  }
};

const fetchBooks = async () => {
  loading.value = true;
  try {
    // Avoid duplicate requests for same category+query
    const fetchKey = `${selectedCategory.value}|${searchQuery.value.trim()}`;
    if (fetchKey === lastFetchKey.value) {
      // nothing changed since last successful fetch
      loading.value = false;
      return;
    }

    let response;
    if (selectedCategory.value === "all") {
      response = searchQuery.value
        ? await searchBooks(searchQuery.value)
        : await getBooks();
    } else {
      response = await getBooksByCategory(selectedCategory.value);
    }

    books.value = response.data;
    // record successful fetch key
    lastFetchKey.value = fetchKey;
  } catch (err) {
    error.value = "Failed to load books.";
  } finally {
    loading.value = false;
  }
};

// Filter kategori agar tidak ada kategori kosong
const filteredCategories = computed(() =>
  categories.value.filter((category) => category.name !== "No Category")
);

// Update kategori & ambil data
const filterBooks = (categoryId) => {
  // prevent re-fetch when clicking the already-selected category
  if (selectedCategory.value === categoryId) return;

  selectedCategory.value = categoryId;
  // clear lastFetchKey so we allow fetch even if query same
  lastFetchKey.value = "";
  fetchBooks();
};

// Cari buku berdasarkan input with debounce
const handleSearch = () => {
  // clear recorded last fetch so a new search forces fetch
  lastFetchKey.value = "";

  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    // when user stops typing for 300ms, fetch
    fetchBooks();
  }, 300);
};

onMounted(() => {
  fetchCategories();
  fetchBooks();
});
</script>

<template>
  <div class="mt-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 mb-20">
    <!-- Search Bar -->
    <div class="flex justify-center mb-6">
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

    <!-- Tabs for Categories -->
    <div class="flex flex-wrap justify-center mb-6 gap-2">
      <button
        @click="filterBooks('all')"
        :class="[
          'px-4 py-2',
          selectedCategory === 'all'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700',
        ]"
        class="rounded-lg"
      >
        All
      </button>
      <button
        v-for="category in filteredCategories"
        :key="category.id"
        @click="filterBooks(category.id)"
        :class="[
          'px-4 py-2',
          selectedCategory === category.id
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700',
        ]"
        class="rounded-lg"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Loading & Error Handling -->
    <div
      v-if="loading"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
    >
      <div v-for="n in 10" :key="n" class="skeleton-card"></div>
    </div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>

    <!-- Books Grid -->
    <div v-else>
      <div v-if="books.length === 0" class="text-center text-gray-500 text-lg">
        📚 Books Not Found
      </div>

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
          <div class="aspect-2-3">
            <RouterLink :to="`/book/${book.id}`">
              <img
                :src="book.image ? book.image : defaultBookImage"
                :alt="book.title"
                class="w-full h-full object-cover"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Placeholder Loading Effect */
.skeleton-card {
  background: #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 0;
  padding-bottom: 150%; /* 2:3 Aspect Ratio */
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

/* Aspect ratio 2:3 */
.aspect-2-3 {
  position: relative;
  width: 100%;
  padding-bottom: 150%;
}

.aspect-2-3 img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
