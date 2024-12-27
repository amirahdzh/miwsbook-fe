<template>
  <div class="dashboard-view p-8 bg-gray-100">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Total Books -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Books</h2>
        <p class="text-4xl font-bold">{{ totals.books }}</p>
      </div>

      <!-- Total Borrows -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Borrows</h2>
        <p class="text-4xl font-bold">{{ totals.borrows }}</p>
      </div>

      <!-- Total Categories -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Total Categories</h2>
        <p class="text-4xl font-bold">{{ totals.categories }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totals = ref({
  books: 0,
  categories: 0,
  borrows: 0,
});

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.error('No token found');
}

const fetchAllData = async (endpoint) => {
  let data = [];
  let page = 1;
  const perPage = 100; // Adjust if necessary

  while (true) {
    const response = await axios.get(endpoint, {
      params: { page, per_page: perPage } // Adjust based on your API
    });
    
    data = data.concat(response.data.data);

    if (response.data.data.length < perPage) {
      break;
    }

    page++;
  }

  return data;
};

const fetchTotals = async () => {
  try {
    // Fetch all books
    const books = await fetchAllData('http://localhost:8000/api/v1/book');
    totals.value.books = books.length;

    // Fetch all borrows
    const borrows = await fetchAllData('http://localhost:8000/api/v1/borrow');
    totals.value.borrows = borrows.length;

    // Fetch all categories
    const categories = await fetchAllData('http://localhost:8000/api/v1/category');
    totals.value.categories = categories.length;

  } catch (error) {
    console.error('Error fetching totals:', error);
  }
};

onMounted(fetchTotals);
</script>

<style scoped>
.dashboard-view {
  height: 100%;
}
</style>
