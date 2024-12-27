<template>
    <div class="mt-4 mx-16 mb-20">
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-if="!loading && !error">
        <h1 class="text-3xl font-bold mb-4">{{ genre.name }}</h1>
        <ul class="space-y-4">
          <li v-for="movie in genre.list_movies" :key="movie.id" class="bg-white shadow-md rounded-lg p-4">
            <h2 class="text-2xl font-semibold mb-2">{{ movie.title }}</h2>
            <p class="text-gray-700 mb-2">{{ movie.summary }}</p>
            <p class="text-gray-500">Year: {{ movie.year }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchGenre } from '../services/genreService';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const genre = ref({});
  const loading = ref(true);
  const error = ref(null);
  
  const loadGenre = async () => {
    const genreId = route.params.id;
    try {
      genre.value = await fetchGenre(genreId);
    } catch (err) {
      error.value = 'Failed to load data.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(loadGenre);
  </script>
  
  <style scoped>
  /* Add your custom styles here if needed */
  </style>
  