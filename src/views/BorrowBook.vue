<template>
  <div class="mt-20 mx-4 sm:mx-16 mb-60">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <!-- Back Button -->
      <div class="mb-4">
        <button
          @click="goBack"
          class="text-primary p-2 rounded hover:text-teal-600"
        >
          &larr; Back
        </button>
      </div>
      <h1 class="text-2xl font-bold mb-4">Borrow Book</h1>

      <!-- Book Preview -->
      <div v-if="book" class="mb-6">
        <div class="flex items-center mb-4">
          <div class="relative w-24 h-24 aspect-140-100 mr-4">
            <img
              v-if="book.image"
              :src="book.image"
              :alt="book.title"
              class="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ book.title }}</h2>
            <p class="text-gray-700">Stock: {{ book.stock }}</p>
          </div>
        </div>
        <RouterLink to="/books">
          <button
            class="bg-secondary text-white font-bold px-4 py-2 rounded-full hover:bg-teal-600"
          >
            Change Book
          </button>
        </RouterLink>
      </div>

      <!-- Borrow Form -->
      <form @submit.prevent="submitBorrowForm">
        <div class="mb-4">
          <label
            for="return-date"
            class="block text-gray-700 font-semibold mb-2"
          >
            Return Date:
          </label>
          <input
            type="date"
            id="return-date"
            v-model="returnDate"
            class="w-full px-4 py-2 border border-gray-300 rounded"
            required
            :min="today"
          />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-teal-600"
          >
            Borrow
          </button>
        </div>
      </form>
    </div>

    <!-- Search Book Modal -->
    <!-- <SearchBookModal
      :isVisible="isSearchModalVisible"
      @close="isSearchModalVisible = false"
      @select="handleBookSelect"
    /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBookById } from "../services/bookService";
import { borrowBook } from "../services/borrowService";
import { isAuthenticated, getUserId } from "../services/authService";

const route = useRoute();
const router = useRouter();
const book = ref(null);
const returnDate = ref("");
const isSearchModalVisible = ref(false);

// Computed property for today's date in yyyy-mm-dd format
const today = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return today;
});

const fetchBook = async (id) => {
  try {
    const response = await getBookById(id);
    book.value = response.data;
  } catch (err) {
    console.error("Failed to load book details:", err);
  }
};

const submitBorrowForm = async () => {
  if (!isAuthenticated()) {
    alert("You need to be logged in to borrow a book.");
    router.push("/login");
    return;
  }

  const userId = getUserId();

  try {
    const response = await borrowBook(book.value.id, returnDate.value, userId);
    if (response.message === "Borrow successfully updated or created") {
      alert("Book borrowed successfully!");
      router.push("/my-borrows"); // Redirect to the My Borrows page
    } else {
      alert("Failed to borrow the book.");
    }
  } catch (err) {
    console.error("Error borrowing book:", err);
    alert("An error occurred while borrowing the book.");
  }
};

const handleBookSelect = (selectedBook) => {
  book.value = selectedBook;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  const { book_id } = route.query;
  if (book_id) {
    fetchBook(book_id);
  }
});
</script>

<style scoped>
/* Aspect ratio of 140%:100 */
.aspect-140-100::before {
  content: "";
  display: block;
  padding-bottom: 140%;
}

.aspect-140-100 img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Apply absolute positioning only on large screens */
@media (min-width: 1024px) {
  .aspect-140-100 {
    position: relative;
  }

  .aspect-140-100 img {
    position: absolute;
  }
}
</style>
