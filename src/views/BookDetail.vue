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
            <!-- Skeleton Loader saat loading -->
            <div v-if="loading" class="skeleton w-full h-full rounded-lg"></div>

            <!-- Gambar buku muncul setelah selesai loading -->
            <img
              v-else
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
            <span v-if="loading" class="skeleton w-60 h-8"></span>
            <span v-else>{{ book.title || "Unknown Title" }}</span>
          </h1>
          <button
            @click="showShareModal = true"
            class="text-primary text-2xl hover:opacity-80"
          >
            <Icon width="40" icon="mdi:share-outline" />
          </button>
        </div>

        <p class="text-xl mt-2 font-dellarespira">
          <span v-if="loading" class="skeleton w-40 h-6"></span>
          <span v-else>
            <span v-if="book.authors?.length">
              {{ book.authors.map((author) => author.name).join(", ") }}
            </span>
            <span v-else>No author data</span>
          </span>
        </p>

        <div v-if="loading" class="skeleton w-32 h-6 mt-4"></div>
        <StarRating v-else :rating="4.5" class="mt-4" />

        <p v-if="loading" class="skeleton w-48 h-6 mt-2"></p>
        <p v-else class="mt-2">120 ratings | 395 reviews</p>

        <p v-if="loading" class="skeleton w-full h-24 mt-4"></p>
        <p v-else-if="book.summary" class="mt-4">{{ book.summary }}</p>
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
import { ref, onMounted } from "vue";
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
const showLoginModal = ref(false);
const showShareModal = ref(false);

const fetchBook = async (id) => {
  loading.value = true;
  try {
    const response = await getBookById(id);
    book.value = response.data;
  } catch (err) {
    console.error("Failed to fetch book details", err);
  } finally {
    loading.value = false;
  }
};

const redirectToBorrowPage = () => {
  if (!isAuthenticated()) {
    showLoginModal.value = true;
    return;
  }
  router.push(`/borrow-book?bookId=${book.value.id}`);
};

const goBack = () => router.back();

onMounted(() => fetchBook(route.params.id));
</script>

<style scoped>
/* Skeleton Loader */
.skeleton {
  background: linear-gradient(-90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

/* Aspect ratio 140:100 (Buku lebih tinggi dari lebar) */
.aspect-140-100 {
  position: relative;
  width: 100%;
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
</style>
