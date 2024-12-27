<template>
  <div id="app" class="flex flex-col h-screen text-dark font-poppins">
    <Spinner />
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { ref, computed, provide } from "vue";
import { useRoute, useRouter } from "vue-router";

// Import layout components
import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";
import Spinner from "./components/Spinner.vue";

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

// Provide the isLoading state globally
provide('isLoading', isLoading);

const layoutComponent = computed(() => {
  const layout = route.meta.layout || "default"; // Default to 'default' layout if no meta.layout

  switch (layout) {
    case "auth":
      return AuthLayout;
    case "admin":
      return AdminLayout;
    default:
      return DefaultLayout;
  }
});

router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500); // Add a small delay for better UX
});
</script>

<style>
/* Global styles here */
</style>
