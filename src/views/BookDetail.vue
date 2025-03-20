<template>
  <div class="mt-20 mx-4 sm:mx-16 mb-60">
    <!-- Back Button -->
    <div class="mb-4">
      <button @click="goBack" class="text-primary p-2 rounded hover:opacity-80">
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
              :src="book.image || '/img/alkemis.jpg'"
              :alt="book.title || 'Book Image'"
              class="object-cover rounded-lg shadow-md w-full h-full"
            />
          </div>
        </div>
        <button
          @click="redirectToBorrowPage"
          class="bg-primary text-white font-bold w-full lg:w-auto px-4 py-4 mt-4 rounded-full hover:opacity-80 flex items-center justify-center gap-2"
        >
          <Icon icon="mdi:book-open" class="mr-2" /> Want to Borrow
        </button>
      </div>

      <!-- Book Details Content -->
      <div class="p-4 w-full lg:w-2/3">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl mb-4 font-bold font-dellarespira">
            {{ book.title || "Unknown Title" }}
          </h1>
          <button
            @click="showShareModal = true"
            class="text-primary text-2xl hover:opacity-80"
          >
            <Icon width="40" icon="mdi:share-outline" />
          </button>
        </div>

        <p class="text-xl mt-2 font-dellarespira">
          <span v-if="book.authors?.length">
            {{ book.authors.map((author) => author.name).join(", ") }}
          </span>
          <span v-else>No author data</span>
        </p>

        <StarRating :rating="4.5" class="mt-4" />
        <p class="mt-2">120 ratings | 395 reviews</p>

        <p v-if="book.summary" class="mt-4">{{ book.summary }}</p>
        <p v-else class="italic text-gray-500">No summary available.</p>

        <!-- Categories -->
        <div
          v-if="book.categories?.length"
          class="flex items-center mt-4 gap-2"
        >
          <h2 class="text-secondary">Categories:</h2>
          <button
            v-for="category in book.categories"
            :key="category.id"
            class="font-bold px-4 py-1 rounded-full border border-primary hover:bg-gray-100"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Stock Information -->
        <div class="mt-4">
          <h2 class="text-secondary">Stock:</h2>
          <span
            :class="{
              'bg-green-200 text-green-800': (book.stock ?? 0) >= 1,
              'bg-red-200 text-red-800': (book.stock ?? 0) === 0,
            }"
            class="inline-block mt-2 px-4 py-1 rounded-full"
          >
            {{
              (book.stock ?? 0) >= 1
                ? `Available (Remain: ${book.stock ?? 0})`
                : "Unavailable (Remain: 0)"
            }}
          </span>
        </div>

        <!-- More Details -->
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
            <p><strong>Published:</strong> July 30, 2024</p>
            <p><strong>ISBN:</strong> 9780316481014</p>
            <p><strong>Language:</strong> English</p>
          </div>
        </div>

        <hr class="mt-6" />

        <!-- About the Author -->
        <div v-if="book.authors?.length" class="mt-6">
          <h1 class="text-2xl mb-6 font-bold font-dellarespira">
            About the Author
          </h1>
          <div class="flex items-center mb-6">
            <img
              :src="book.authors?.[0]?.photo || '/img/miw.jpg'"
              :alt="book.authors?.[0]?.name"
              class="w-16 h-16 rounded-full object-cover mr-4"
            />
            <h2 class="text-2xl font-bold mb-2 font-dellarespira">
              {{ book.authors?.[0]?.name || "Unknown Author" }}
            </h2>
          </div>
          <p class="text-gray-700">
            {{ truncatedAuthorDescription }}
            <button
              @click="toggleAuthorDetails"
              class="text-primary font-semibold mt-2"
            >
              {{ showAuthorDetails ? "View Less" : "View More" }}
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
              class="bg-primary text-white font-bold px-4 py-2 rounded-full hover:opacity-80"
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
  </div>

  <!-- Modals -->
  <LoginModal :isVisible="showLoginModal" @close="showLoginModal = false" />
  <ShareModal
    :isVisible="showShareModal"
    @close="showShareModal = false"
    class="z-50"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBookById } from "../services/bookService";
import { isAuthenticated } from "../services/authService";
import LoginModal from "../components/LoginModal.vue";
import ShareModal from "../components/ShareModal.vue";
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

const truncatedAuthorDescription = computed(() => {
  const desc = book.value.authors?.[0]?.bio || "No bio available.";
  return showAuthorDetails.value ? desc : desc.slice(0, 100) + "...";
});

const fetchBook = async (id) => {
  try {
    const response = await getBookById(id);
    book.value = response.data;
  } catch (err) {
    console.error("Failed to fetch book details", err);
  }
};

const goBack = () => router.back();
const toggleDetails = () => (showDetails.value = !showDetails.value);
const toggleAuthorDetails = () =>
  (showAuthorDetails.value = !showAuthorDetails.value);

onMounted(() => fetchBook(route.params.id));
watch(() => route.params.id, fetchBook, { immediate: true });
</script>
