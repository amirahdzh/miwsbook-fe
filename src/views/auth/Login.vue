<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <RouterLink
        to="/"
        class="block text-center mb-6 text-primary text-3xl font-bold font-dellarespira"
      >
        {{ appName.toUpperCase() }}
      </RouterLink>
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark" for="email">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="block w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-primary"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark" for="password">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="block w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 text-white bg-primary rounded-lg hover:opacity-80 flex items-center justify-center space-x-2"
        >
          <span v-if="isLoading">
            <Icon icon="mdi:loading" class="w-6 h-6 animate-spin" />
          </span>
          <span v-else>Login</span>
        </button>
      </form>
      <p class="m-4 text-center text-gray-600">
        Don't have an account?
        <RouterLink to="/register" class="text-primary hover:underline"
          >Register</RouterLink
        >
      </p>
      <RouterLink
        to="/"
        class="relative justify-center text-dark hover:underline hover: flex items-center"
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
import { login as loginUser } from "../../services/authService";
import { Icon } from "@iconify/vue";
import { inject } from "vue";

const appName = inject("appName");

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const router = useRouter();

const login = async () => {
  isLoading.value = true;
  try {
    const { token, user } = await loginUser(email.value, password.value);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (user && user.role.name === "owner") {
      router.push("/owner/dashboard");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials and try again.");
  } finally {
    isLoading.value = false;
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
