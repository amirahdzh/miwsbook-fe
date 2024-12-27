<template>
  <div class="mt-20 mx-4 sm:mx-16 mb-60">
    <!-- Back Button -->
    <div class="mb-4">
      <button
        @click="goBack"
        class="text-primary p-2 rounded hover:text-teal-600"
      >
        &larr; Back
      </button>
    </div>

    <!-- Book Details -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Book Image and Borrow Button -->
      <div class="w-full lg:w-1/3 flex flex-col items-center gap-4">
        <div class="relative w-full max-w-xs">
          <div class="aspect-140-100">
            <img
              v-if="book.image"
              :src="book.image"
              :alt="book.title"
              class="object-cover rounded-lg shadow-md w-full h-full"
            />
          </div>
        </div>
        <button
          @click="redirectToBorrowPage"
          class="bg-primary text-white font-bold w-full lg:w-auto px-4 py-4 mt-4 rounded-full hover:bg-teal-600 flex items-center justify-center gap-2"
        >
          <Icon icon="mdi:book-open" class="mr-2" /> Want to Borrow
        </button>
      </div>

      <!-- Book Details Content -->
      <div class="p-4 w-full lg:w-2/3">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl mb-4 font-bold font-dellarespira">
            {{ book.title }}
          </h1>
          <button
            @click="showShareModal = true"
            class="text-primary text-2xl hover:text-teal-600"
          >
            <Icon width="40" icon="mdi:share-outline" />
          </button>
        </div>
        <p class="text-xl mt-2 font-dellarespira">John Doe</p>

        <StarRating :rating="4.5" class="mt-4" />

        <p class="mt-2">120 ratings | 395 reviews</p>

        <p class="mt-4">{{ book.summary }}</p>

        <!-- Bagian tombol kategori -->
        <div v-if="book.category" class="flex items-center mt-4">
          <h2 class="text-secondary mr-2">Category:</h2>
          <button
            class="font-bold px-4 py-1 rounded-full border border-primary hover:bg-gray-100"
          >
            {{ book.category.name }}
          </button>
        </div>

        <!-- Stock Information -->
        <div class="mt-4">
          <h2 class="text-secondary mr-2">Stock:</h2>
          <span
            :class="{
              'bg-green-200 text-green-800': book.stock > 50,
              'bg-yellow-200 text-yellow-800':
                book.stock > 10 && book.stock <= 50,
              'bg-red-200 text-red-800': book.stock <= 10,
            }"
            class="inline-block mt-2 px-4 py-1 rounded-full"
          >
            {{ book.stock }} available
          </span>
        </div>

        <!-- More Details Toggle -->
        <div class="mt-4">
          <button
            @click="toggleDetails"
            class="flex items-center text-primary font-semibold"
          >
            <Icon
              :icon="showDetails ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="mr-2"
            />
            More Details
          </button>

          <div v-if="showDetails" class="mt-4">
            <p><strong>Format:</strong> 384 pages, Hardcover</p>
            <p>
              <strong>Published:</strong> July 30, 2024 by Little, Brown Books
              for Young Readers
            </p>
            <p><strong>ISBN:</strong> 9780316481014 (ISBN10: 0316481017)</p>
            <p><strong>ASIN:</strong> 0316481017</p>
            <p><strong>Language:</strong> English</p>
          </div>
        </div>

        <hr class="mt-6" />

        <!-- About the Author Section -->
        <div class="mt-6">
          <h1 class="text-2xl mb-6 font-bold font-dellarespira">
            About the Author
          </h1>
          <div class="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Author Photo"
              class="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h2 class="text-2xl font-bold mb-2 font-dellarespira">
                John Doe
              </h2>
              <p class="text-secondary">41 books</p>
            </div>
          </div>
          <p class="text-gray-700">
            {{ truncatedAuthorDescription }}
            <button
              @click="toggleAuthorDetails"
              class="text-primary font-semibold mt-2"
            >
              {{ showAuthorDetails ? 'View Less' : 'View More' }}
            </button>
          </p>
        </div>

        <hr class="mt-6" />

        <!-- Rating and Review Section -->
        <div class="mt-8">
          <h1 class="text-2xl mb-6 font-bold font-dellarespira">
            Ratings and Reviews
          </h1>
          <div class="flex justify-center">
            <Icon icon="mdi:account-circle" width="80" class="text-primary" />
          </div>

          <!-- Profile Icon and Text -->
          <div class="flex items-center justify-center mb-6">
            <h2 class="text-center text-3xl">
              What do
              <span class="font-bold text-primary font-dellarespira">
                you
              </span>
              think?
            </h2>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button
              @click="checkAuth"
              class="bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-teal-600"
            >
              Write a Review
            </button>
            <div class="">
              <div class="flex items-center" role="group" aria-label="Rating">
                <button
                  v-for="n in 5"
                  :key="n"
                  :class="{
                    'text-yellow-500': n <= (hoverRating || rating),
                    'text-gray-300': n > (hoverRating || rating),
                    'cursor-pointer': true,
                  }"
                  class="text-3xl focus:outline-none"
                  @mouseover="hoverRating = n"
                  @mouseleave="hoverRating = 0"
                  @click="updateRating(n)"
                >
                  <Icon icon="mdi:star" />
                </button>
              </div>
              <h3 class="text-center">Rate this book</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal :isVisible="showLoginModal" @close="showLoginModal = false" />
    <!-- Share Modal -->
    <ShareModal :isVisible="showShareModal" @close="showShareModal = false" />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted, watch } from "vue";
import { getBookById } from "../services/bookService";
import { useRoute, useRouter } from "vue-router";
import LoginModal from "../components/LoginModal.vue";
import ShareModal from "../components/ShareModal.vue";
import { isAuthenticated } from "../services/authService";
import { Icon } from "@iconify/vue";
import StarRating from "../components/StarRating.vue";

const route = useRoute();
const router = useRouter();
const book = ref({});
const loading = ref(true);
const error = ref(null);
const showLoginModal = ref(false);
const showShareModal = ref(false);
const showDetails = ref(false);
const showAuthorDetails = ref(false);
const rating = ref(0);
const hoverRating = ref(0);

const fullAuthorDescription =
  "John Doe is a renowned author known for his best-selling novels. His works often explore themes of adventure and personal growth. Over the past decade, he has written several critically acclaimed books, including 'The Great Journey' and 'Life Beyond Limits.' He has received numerous awards for his contributions to literature and continues to inspire readers with his storytelling prowess. In addition to writing, John is also an avid traveler and enjoys sharing his experiences through his work. His passion for writing and dedication to his craft have solidified his place as a significant figure in contemporary literature.";

const truncatedAuthorDescription = computed(() => {
  if (showAuthorDetails.value) return fullAuthorDescription;
  return fullAuthorDescription.length > 100
    ? fullAuthorDescription.slice(0, 100) + "..."
    : fullAuthorDescription;
});

const toggleAuthorDetails = () => {
  showAuthorDetails.value = !showAuthorDetails.value;
};

const fetchBook = async (id) => {
  try {
    const response = await getBookById(id);
    console.log("Fetched book:", response.data); // Tambahkan log ini
    book.value = response.data;
  } catch (err) {
    error.value = "Failed to load book details.";
  } finally {
    loading.value = false;
  }
};

const toggleDetails = () => {
  console.log("Toggling details"); // Tambahkan log ini
  showDetails.value = !showDetails.value;
};


const checkAuth = () => {
  if (!isAuthenticated()) {
    showLoginModal.value = true;
  } else {
    router.push(`/books/${book.value.id}/review`);
  }
};

const redirectToBorrowPage = () => {
  if (!isAuthenticated()) {
    showLoginModal.value = true;
    return;
  }
  router.push(`/borrow-book?book_id=${book.value.id}`);
};

const goBack = () => {
  router.push(`/books`);
};

// Fetch book details based on route parameter
const loadBook = () => {
  const { id } = route.params;
  fetchBook(id);
};

// Watch for route changes to fetch new book data
watch(() => route.params.id, loadBook, { immediate: true });

onMounted(() => {
  const { id } = route.params;
  fetchBook(id);
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

/* Apply relative positioning on all screen sizes */
.aspect-140-100 {
  position: relative;
}
</style>
