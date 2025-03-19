<template>
  <section id="home">
    <div class="container py-20">
      <div class="flex flex-wrap">
        <div class="w-full self-center px-8 lg:w-1/2 py-20">
          <h1 class="text-base text-secondary md:text-xl">
            🌙 Explore My Realm of Dreams & Pages
            <span
              class="block font-bold text-dark text-3xl font-dellarespira lg:text-3xl xl:text-4xl mt-4"
            >
              📖 Welcome to
              <span class="text-primary font-bold font-dellarespira"
                >{{ appName }} &nbsp;</span
              >– My Literary World
            </span>
          </h1>
          <p class="text-dark mt-4 leading-relaxed lg:text-lg">
            Step into my world of stories, book reviews, and hidden gems that
            shaped my journey. 🌿📚
          </p>
          <div class="mt-8 flex items-center space-x-4">
            <!-- Search Bar -->
            <div class="relative flex-grow">
              <input
                v-model="searchQuery"
                @input="searchBooks"
                type="text"
                placeholder="Search books..."
                class="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                @click="searchBooks"
              >
                <Icon icon="mdi:magnify" class="w-6 h-6" />
              </button>
              <ul
                v-if="searchResults.length > 0"
                class="absolute bg-white shadow-lg rounded-md mt-2 w-full z-10"
              >
                <li
                  v-for="book in searchResults"
                  :key="book.id"
                  @click="handleBookSelect(book.id)"
                  class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {{ book.title }}
                </li>
              </ul>
            </div>
            <!-- Button -->
            <RouterLink
              to="/books"
              class="text-base bg-primary text-white py-2 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
            >
              View Collection
            </RouterLink>
          </div>
        </div>
        <div class="w-full self-end px-4 lg:w-1/2">
          <div class="relative mt-10 lg:mt-9 lg:right-0">
            <img src="/img/book.png" alt="Books" class="max-w-full mx-auto" />
            <span
              class="absolute -bottom-0 -z-10 left-1/2 -translate-x-1/2 md:scale-125"
            >
              <!-- <svg
                width="600"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#F48FB1"
                  d="M25.1,-43.5C32,-39.4,36.8,-31.7,48.9,-23.9C61,-16,80.5,-8,79.4,-0.6C78.3,6.8,56.7,13.5,47.2,25.9C37.7,38.3,40.3,56.4,34.5,64.5C28.6,72.7,14.3,71.1,3,66C-8.4,60.8,-16.8,52.2,-22.3,43.9C-27.9,35.5,-30.6,27.4,-39,20.1C-47.4,12.8,-61.5,6.4,-66.1,-2.7C-70.7,-11.7,-65.8,-23.5,-60.4,-35.9C-55,-48.4,-49.1,-61.6,-39,-63.8C-28.8,-66,-14.4,-57.1,-2.7,-52.5C9.1,-47.9,18.1,-47.5,25.1,-43.5Z"
                  transform="translate(100 100)"
                />
              </svg> -->
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { searchBooks as searchBooksService } from "../services/bookService";
import { Icon } from "@iconify/vue";

import { inject } from "vue";

const appName = inject("appName");

const searchQuery = ref("");
const searchResults = ref([]);
const router = useRouter();

const searchBooks = async () => {
  if (searchQuery.value.trim() === "") {
    searchResults.value = [];
    return;
  }

  try {
    const results = await searchBooksService(searchQuery.value);
    searchResults.value = results.data;
  } catch (error) {
    console.error("Error searching books:", error);
    searchResults.value = [];
  }
};

const handleBookSelect = (bookId) => {
  router.push(`/book/${bookId}`);
  searchQuery.value = "";
  searchResults.value = [];
};
</script>

<style scoped>
/* Global styles here */
</style>
