<template>
  <div class="container mt-20 mb-20 mx-auto p-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary">My Borrows</h1>
      <!-- <p class="text-lg text-gray-600">Browse our collection of books</p> -->
    </div>
    <!-- Show spinner when loading -->
    <Spinner v-if="loading" class="text-center" />

    <!-- Show error message if there is an error -->
    <div v-if="error && !loading" class="text-red-500 text-center mb-4">{{ error }}</div>

    <!-- Show content only when data is loaded -->
    <template v-if="!loading && !error">
      <div v-if="borrows.length === 0" class="text-center">
        <div class="flex items-center justify-center">
          <!-- Book Image -->
          <div class="relative max-w-xs">
            <img src="/img/book.png" alt="Book" class="max-w-full mx-auto" />
            <span
              class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:scale-125"
            >
              <!-- Decorative or additional content here -->
            </span>
          </div>
          <!-- Text Content -->
          <div class="ml-4 text-center">
            <p class="text-lg mb-2">No Books Borrowed Yet</p>
            <button
              @click="goToBookList"
              class="text-xl text-primary font-bold underline"
            >
              Borrow a book
            </button>
          </div>
        </div>
      </div>

      <!-- Show list of borrowed books when there are borrows -->
      <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="borrow in borrows"
          :key="borrow.id"
          class="flex p-4 border border-gray-200 rounded-lg gap-6 items-start"
        >
          <!-- Book Image -->
          <div class="w-32 h-48 flex-shrink-0">
            <img
              v-if="borrow.book.image"
              :src="borrow.book.image"
              :alt="borrow.book.title"
              class="object-cover rounded-lg aspect-150-100 w-full h-full"
            />
          </div>
          <!-- Book Details -->
          <div class="flex-1">
            <h2 class="text-xl font-semibold mb-2">{{ borrow.book.title }}</h2>
            <p class="text-gray-600 mb-1">
              Borrowed on: {{ new Date(borrow.borrow_date).toLocaleDateString() }}
            </p>
            <p class="text-gray-600 mb-1">
              Return date: {{ new Date(borrow.return_date).toLocaleDateString() }}
            </p>
            <p class="text-gray-600 mb-1">
              <!-- Conditional rendering for days remaining or overdue -->
              {{ getDaysRemainingText(borrow.return_date) }}
            </p>
            <p v-if="borrow.is_overdue" class="text-red-500 font-bold">
              Overdue!
            </p>
            <!-- Return Book Button -->
            <button
              v-if="!borrow.is_returned"
              @click="handleReturn(borrow.id)"
              class="mt-4 bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-teal-600"
            >
              Return Book
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getBorrowedBooks } from "../services/borrowService"; // add returnBook jika sudah ada
import { useRouter } from "vue-router";
import Spinner from "../components/Spinner.vue"; // Pastikan jalur impor sesuai dengan lokasi komponen Spinner

const borrows = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchBorrowedBooks = async () => {
  try {
    const response = await getBorrowedBooks();
    borrows.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch borrowed books.";
  } finally {
    loading.value = false;
  }
};

// Handle book return
const handleReturn = async (borrowId) => {
  try {
    await returnBook(borrowId); // Ensure returnBook method is defined
    // Refresh the list after returning the book
    await fetchBorrowedBooks();
  } catch (err) {
    error.value = "Failed to return the book.";
  }
};

// Calculate days remaining or passed
const getDaysRemainingText = (returnDate) => {
  const now = new Date();
  const returnDateObj = new Date(returnDate);
  const timeDiff = returnDateObj - now;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  if (daysRemaining > 0) {
    return `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} remaining`;
  } else {
    return `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) > 1 ? 's' : ''} have passed`;
  }
};

const goToBookList = () => {
  router.push("/books"); // Update path if necessary
};

onMounted(() => {
  fetchBorrowedBooks();
});
</script>

<style scoped>
/* Aspect ratio of 150%:100 */
.aspect-150-100::before {
  content: "";
  display: block;
  padding-bottom: 150%;
}

.aspect-150-100 img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive grid layout */
@media (min-width: 640px) {
  .md\:grid-cols-1 {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .xl\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

