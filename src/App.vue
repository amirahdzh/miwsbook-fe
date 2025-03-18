<template>
  <!-- Root application container with styling -->
  <div id="app" class="flex flex-col h-screen text-dark font-poppins">
    <!-- Spinner component to show loading state -->
    <Spinner />
    <!-- Dynamically render the layout component based on the route's meta.layout -->
    <component :is="layoutComponent">
      <!-- Render the current route's component -->
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { ref, computed, provide } from "vue";
import { useRoute, useRouter } from "vue-router";

// Import layout components
import DefaultLayout from "./layouts/DefaultLayout.vue"; // Default layout for most pages
import AuthLayout from "./layouts/AuthLayout.vue"; // Layout for authentication-related pages
import AdminLayout from "./layouts/AdminLayout.vue"; // Layout for admin-related pages
import Spinner from "./components/Spinner.vue"; // Loading spinner component

// Access the current route and router instance
const route = useRoute();
const router = useRouter();

// Reactive variable to track loading state
const isLoading = ref(false);

// Provide the isLoading state globally so child components can access it
provide("isLoading", isLoading);

// Compute the layout component dynamically based on the route's meta.layout property
const layoutComponent = computed(() => {
  const layout = route.meta.layout || "default"; // Default to 'default' layout if no meta.layout is specified

  switch (layout) {
    case "auth":
      return AuthLayout; // Use AuthLayout for 'auth' layout
    case "admin":
      return AdminLayout; // Use AdminLayout for 'admin' layout
    default:
      return DefaultLayout; // Use DefaultLayout for all other cases
  }
});

// Add a global navigation guard to handle loading state
router.beforeEach((to, from, next) => {
  isLoading.value = true; // Set loading state to true before navigating
  next(); // Proceed to the next route
});

router.afterEach(() => {
  // Add a small delay before setting loading state to false for better UX
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>

<style>
/* Global styles here */
</style>
