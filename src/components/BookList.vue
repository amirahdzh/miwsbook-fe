<template>
    <div>
      <!-- Pencarian Buku -->
      <div class="relative mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for books..."
          class="p-2 border border-gray-200 rounded-lg w-full"
        />
        <button
          @click="searchBooks"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          <Icon icon="mdi:magnify" class="w-6 h-6" />
        </button>
      </div>
  
      <!-- Daftar Buku -->
      <div v-if="filteredBooks.length > 0">
        <ul>
          <li v-for="book in filteredBooks" :key="book.id">
            {{ book.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        No books found.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getBooks } from '../services/bookService'; // Import fungsi untuk mendapatkan daftar buku
  import { Icon } from '@iconify/vue';
  
  const searchQuery = ref('');
  const books = ref([]);
  const filteredBooks = computed(() => {
    return books.value.filter(book =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      books.value = response.data;
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };
  
  const searchBooks = () => {
    // Filter books based on search query
    // Computed property `filteredBooks` will handle this
  };
  
  onMounted(() => {
    fetchBooks();
  });
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  