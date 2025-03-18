<template>
  <header
    class="bg-transparent fixed top-0 left-0 w-full flex items-center z-10"
  >
    <div class="container mx-auto flex justify-between items-center py-4">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-bold text-primary font-dellarespira"
      >
        {{ appName.toUpperCase() }}
      </RouterLink>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8 items-center">
        <RouterLink to="/books" class="nav-item">
          <button class="nav-button">Books</button>
        </RouterLink>
        <RouterLink to="/categories" class="nav-item">
          <button class="nav-button">Categories</button>
        </RouterLink>
        <button @click="handleMyBorrowsClick" class="nav-button">
          My Borrows
        </button>
      </nav>

      <!-- Search and User Info -->
      <div class="flex items-center space-x-4">
        <!-- Search Bar -->
        <div class="relative hidden lg:flex items-center">
          <input
            v-model="searchQuery"
            @input="searchBooks"
            type="text"
            placeholder="Search..."
            class="p-2 border border-gray-200 focus:outline-none rounded-lg"
          />
          <button
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-dark focus:outline-none"
            @click="searchBooks"
          >
            <Icon icon="mdi:magnify" class="w-6 h-6" />
          </button>
          <!-- Desktop Search Results -->
          <ul
            v-if="searchResults.length"
            ref="searchResultsRef"
            class="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-20"
          >
            <li
              v-for="book in searchResults"
              :key="book.id"
              class="flex items-center py-2 border-b border-gray-200"
            >
              <img
                :src="book.image"
                alt="cover"
                class="w-10 h-14 object-cover mr-2"
              />
              <RouterLink
                :to="`/book/${book.id}`"
                class="text-blue-500 hover:underline"
              >
                {{ book.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- Mobile Search Toggle -->
        <button
          @click="toggleSearch"
          class="block lg:hidden text-gray-600 focus:outline-none"
        >
          <Icon icon="mdi:magnify" class="w-6 h-6" />
        </button>

        <!-- User Dropdown -->
        <div class="relative" v-if="user && user.name">
          <button
            @click="toggleDropdown"
            :class="[
              'flex items-center text-base px-4 py-2 rounded-md',
              isDropdownOpen
                ? 'bg-secondary text-white'
                : 'bg-primary text-white',
            ]"
            class="hover:bg-secondary focus:outline-none"
          >
            <Icon icon="mdi:account" class="w-6 h-6" />
            <span class="hidden md:block ml-2">{{ user.name }}</span>
            <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-1" />
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20"
          >
            <RouterLink
              to="/profile"
              @click="toggleDropdown"
              class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="mdi:account" class="w-6 h-6 mr-2" />
              Profile
            </RouterLink>
            <RouterLink
              v-if="isAdmin"
              to="/owner/dashboard"
              @click="toggleDropdown"
              class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="mdi:view-dashboard" class="w-6 h-6 mr-2" />
              Dashboard
            </RouterLink>
            <button
              @click="logout"
              class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Icon icon="mdi:logout" class="w-6 h-6 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <RouterLink
          v-else
          to="/login"
          class="flex items-center text-base bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md"
        >
          <Icon icon="mdi:login" class="w-6 h-6" />
          <span class="hidden md:block ml-2">Login</span>
        </RouterLink>
      </div>

      <!-- Hamburger Menu -->
      <button
        @click="toggleMenu"
        class="md:hidden text-gray-600 focus:outline-none"
      >
        <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-8 h-8" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 md:hidden"
    >
      <nav class="space-y-4 p-4">
        <RouterLink
          to="/"
          @click="toggleMenu"
          class="block text-base text-dark hover:text-primary"
          >Home</RouterLink
        >
        <RouterLink
          to="/books"
          @click="toggleMenu"
          class="block text-base text-dark hover:text-primary"
          >Books</RouterLink
        >
        <RouterLink
          to="/categories"
          @click="toggleMenu"
          class="block text-base text-dark hover:text-primary"
          >Categories</RouterLink
        >
        <RouterLink
          v-if="isAuthenticated"
          to="/my-borrows"
          @click="toggleMenu"
          class="block text-base text-dark hover:text-primary"
        >
          My Borrows
        </RouterLink>
        <!-- <RouterLink
          to="/login"
          @click="toggleMenu"
          class="text-base text-dark hover:text-primary flex items-center"
        >
          <Icon icon="mdi:login" class="w-6 h-6 mr-2" />
          Login
        </RouterLink> -->
      </nav>
    </div>

    <!-- Mobile Search -->
    <div
      v-if="isSearchOpen"
      ref="mobileSearchResultsRef"
      class="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg p-4 mt-2 lg:hidden"
    >
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="searchBooks"
          type="text"
          placeholder="Search..."
          class="w-full p-2 border-b border-gray-200 focus:outline-none"
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
          @click="searchBooks"
        >
          <Icon icon="mdi:magnify" class="w-6 h-6" />
        </button>
      </div>
      <!-- Display Mobile Search Results -->
      <ul v-if="searchResults.length" class="mt-2 space-y-2">
        <li
          v-for="book in searchResults"
          :key="book.id"
          class="flex items-center"
        >
          <img
            :src="book.image"
            alt="cover"
            class="w-10 h-14 object-cover mr-2"
          />
          <RouterLink
            :to="`/book/${book.id}`"
            class="text-blue-500 hover:underline"
          >
            {{ book.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>

  <!-- Login Modal -->
  <LoginModal :isVisible="showLoginPrompt" @close="closeLoginPrompt" />

  <!-- Confirmation Modal -->
  <ConfirmModal
    v-if="isConfirmModalVisible"
    :message="'Are you sure you want to logout?'"
    @confirm="handleLogout"
    @cancel="closeConfirmModal"
  />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { searchBooks as searchBooksService } from "../services/bookService";
import LoginModal from "../components/LoginModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import { inject } from "vue";

const appName = inject("appName");

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isDropdownOpen = ref(false);
const showLoginPrompt = ref(false);
const user = ref(null);
const searchQuery = ref("");
const searchResults = ref([]);
const searchResultsRef = ref(null);
const mobileSearchResultsRef = ref(null);
const router = useRouter();
const isConfirmModalVisible = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  showConfirmModal();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null;
  router.push("/login");
};

const showConfirmModal = () => {
  isConfirmModalVisible.value = true;
};

const closeConfirmModal = () => {
  isConfirmModalVisible.value = false;
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null;
  router.push("/login");
  closeConfirmModal();
};

onMounted(() => {
  const userString = localStorage.getItem("user");
  user.value = userString ? JSON.parse(userString) : null;

  const header = document.querySelector("header");
  if (header) {
    window.onscroll = function () {
      const fixedNav = header.offsetTop;
      if (window.scrollY > fixedNav) {
        header.classList.add("navbar-fixed");
      } else {
        header.classList.remove("navbar-fixed");
      }
    };
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.onscroll = null;
  document.removeEventListener("click", handleClickOutside);
});

const isAdmin = computed(() => {
  return user.value && user.value.role && user.value.role.name === "owner";
});

const isAuthenticated = computed(() => !!user.value);

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

const handleMyBorrowsClick = () => {
  if (!isAuthenticated.value) {
    showLoginPrompt.value = true;
  } else {
    router.push("/my-borrows");
  }
};

const closeLoginPrompt = () => {
  showLoginPrompt.value = false;
};

const handleClickOutside = (event) => {
  const isClickInsideDropdown =
    event.target.closest(".relative") || event.target.closest(".absolute");

  if (!isClickInsideDropdown) {
    isDropdownOpen.value = false;
  }
};
</script>

<style scoped>
.navbar-fixed {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item button.nav-button {
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.rounded-md {
  border-radius: 0.375rem;
}
</style>
