<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-20">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center text-primary mb-6 hover:text-primary-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <h2 class="text-3xl font-bold mb-6 text-center text-primary">Profile</h2>
      <form @submit.prevent="handleUpdateProfile" class="space-y-6">
        <!-- Name -->
        <div class="form-group">
          <label for="name" class="block text-gray-700 text-sm font-medium"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="user.name"
            class="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your name"
          />
        </div>
        <!-- Email -->
        <div class="form-group">
          <label for="email" class="block text-gray-700 text-sm font-medium"
            >Email</label
          >
          <input
            type="text"
            id="email"
            v-model="user.email"
            class="mt-1 p-3 w-full border rounded-lg bg-gray-200 cursor-not-allowed"
            placeholder="Your email address"
            disabled
          />
        </div>
        <!-- Role -->
        <div class="form-group">
          <label for="role" class="block text-gray-700 text-sm font-medium"
            >Role</label
          >
          <input
            type="text"
            id="role"
            v-model="user.role"
            class="mt-1 p-3 w-full border rounded-lg bg-gray-200 cursor-not-allowed"
            placeholder="Your role"
            disabled
          />
        </div>
        <!-- Age -->
        <div class="form-group">
          <label for="age" class="block text-gray-700 text-sm font-medium"
            >Age</label
          >
          <input
            type="number"
            id="age"
            v-model="profile.age"
            class="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your age"
          />
        </div>
        <!-- Biodata -->
        <div class="form-group">
          <label for="biodata" class="block text-gray-700 text-sm font-medium"
            >Biodata</label
          >
          <textarea
            id="biodata"
            v-model="profile.biodata"
            rows="4"
            class="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your biodata"
          ></textarea>
        </div>
        <!-- Update Button -->
        <button
          type="submit"
          class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { publicApi, privateApi } from "@/utils/api";

const router = useRouter();
const user = ref({});
const profile = ref({
  age: "",
  biodata: "",
});

const getProfile = async () => {
  try {
    // use centralized axios instance with dynamic base URL
    const response = await privateApi.get("/me");
    const { user: apiUser } = response.data;
    profile.value = {
      age: apiUser.profile ? apiUser.profile.age : "",
      biodata: apiUser.profile ? apiUser.profile.biodata : "",
    };
    user.value = {
      ...apiUser,
      role: apiUser.role || { name: "No Role" },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

const handleUpdateProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("age", profile.value.age);
    formData.append("biodata", profile.value.biodata);

    const response = await privateApi.post("/profile", formData, {
      headers: { Accept: "application/json" },
    });

    alert("Profile updated successfully!");
    // Optional: Reload profile data
    await getProfile();
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  }
};

const goBack = () => {
  router.go(-1); // Go back to the previous page
};

onMounted(getProfile);
</script>

<style scoped>
/* Global Styles for form inputs and labels */
.form-group {
  margin-bottom: 1.5rem;
}

input[type="text"],
input[type="number"],
textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

textarea {
  resize: vertical;
}
</style>
