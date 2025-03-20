<template>
  <div class="relative w-full max-w-lg" ref="dropdownRef">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search books..."
      class="w-full px-4 py-2 border border-gray-300 rounded"
      @input="debounceFetchBooks"
      @focus="isDropdownOpen = true"
    />

    <!-- Indikator Loading -->
    <p v-if="isLoading" class="absolute left-0 mt-1 text-gray-500 text-sm px-2">
      Searching...
    </p>

    <!-- Hasil Pencarian -->
    <ul
      v-if="isDropdownOpen && books.length"
      class="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
    >
      <li
        v-for="book in books"
        :key="book.id"
        @click="handleBookSelect(book)"
        class="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
      >
        <!-- Cover Buku -->
        <img
          v-if="book.coverImage"
          :src="book.coverImage"
          alt="Book Cover"
          class="w-12 h-16 object-cover rounded mr-3"
        />
        <div>
          <p class="text-sm font-medium">{{ book.title }}</p>
          <p class="text-xs text-gray-600">Author: {{ book.author }}</p>
        </div>
      </li>
    </ul>

    <!-- Jika Tidak Ada Hasil -->
    <p
      v-if="!isLoading && isDropdownOpen && searchQuery && !books.length"
      class="absolute left-0 mt-1 text-gray-500 text-sm px-2"
    >
      No books found.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { searchBooks } from "@/services/bookService"; // Import fungsi API

const router = useRouter();

const searchQuery = ref("");
const books = ref([]);
const isLoading = ref(false);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

let timeout = null;

// Fungsi debounce agar tidak spam request API
const debounceFetchBooks = () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchBooks, 500);
};

// Fetch dari API berdasarkan query
const fetchBooks = async () => {
  if (!searchQuery.value.trim()) {
    books.value = [];
    isDropdownOpen.value = false;
    return;
  }

  isLoading.value = true;
  isDropdownOpen.value = true;

  try {
    const response = await searchBooks(searchQuery.value);
    books.value = Array.isArray(response.data)
      ? response.data.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors.length > 0 ? book.authors[0].name : "Unknown", // Ambil penulis pertama
          coverImage: book.image || "/img/book.png", // Gunakan placeholder jika tidak ada gambar
        }))
      : [];
  } catch (err) {
    console.error("Error fetching books:", err);
    books.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Fungsi saat buku dipilih
const handleBookSelect = (book) => {
  router.push(`/book/${book.id}`);
  searchQuery.value = "";
  books.value = [];
  isDropdownOpen.value = false;
};

// Fungsi untuk menutup dropdown jika user klik di luar
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

// Tambahkan event listener saat komponen dimount
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Hapus event listener saat komponen di-unmount
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
