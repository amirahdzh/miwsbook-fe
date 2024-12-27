<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
      <RouterLink to="/" class="block text-center mb-6 text-primary text-3xl font-bold font-dellarespira">
        Book World
      </RouterLink>
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password_confirmation" class="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="password_confirmation"
            class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center space-x-2"
        >
          <span v-if="isLoading">
            <Icon icon="mdi:loading" class="w-6 h-6 animate-spin" />
          </span>
          <span v-else>Register</span>
        </button>
      </form>
      <p class="my-4 text-center text-gray-600">
        Already have an account?
        <RouterLink to="/login" class="text-primary hover:underline">Login</RouterLink>
      </p>
      <RouterLink
        to="/"
        class="relative justify-center text-dark hover:underline flex items-center"
      >
        <Icon icon="mdi:home" class="w-6 h-6 mr-2" />
        Enter Guest Mode
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { register } from "../../services/authService";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const isLoading = ref(false); // New reactive property
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== password_confirmation.value) {
    alert("Passwords do not match");
    return;
  }

  isLoading.value = true; // Start loading
  try {
    const response = await register(name.value, email.value, password.value, password_confirmation.value);

    if (response.status === 201) {
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      router.push("/");
    } else {
      alert("Registration failed. Please check your inputs and try again.");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please check your inputs and try again.");
  } finally {
    isLoading.value = false; // Stop loading
  }
};
</script>

<style scoped>
/* Optional: Adjust size of the icon if needed */
.w-6 {
  width: 24px;
}

.h-6 {
  height: 24px;
}

/* Ensure button content is centered */
.flex.items-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
