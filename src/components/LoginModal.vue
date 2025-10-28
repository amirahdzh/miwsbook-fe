<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">Please Log In</h2>
      <p class="mb-4">You need to log in</p>
      <button
        @click="login"
        class="bg-primary text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Log In
      </button>
      <button
        @click="close"
        class="ml-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login as loginService } from "../services/authService";

const props = defineProps(["isVisible"]);
const emit = defineEmits(["close"]);
const router = useRouter();

const login = async () => {
  // Redirect to login page or handle login logic here
  router.push("/login");
};

const close = () => {
  emit("close");
};
</script>

<style scoped>
/* Add custom styling for the modal here if needed */
</style>
