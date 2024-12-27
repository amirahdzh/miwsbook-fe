<template>
  <div class="p-6">
    <!-- Back Button -->
    <div class="mb-4">
      <button
        @click="goBack"
        class="text-primary p-2 rounded hover:text-teal-600"
      >
        &larr; Back
      </button>
    </div>
    <h1 class="text-2xl font-bold mb-4">Manage Users</h1>

    <!-- Users List -->
    <div class="mb-6">
      <h2 class="text-xl mb-2">Users with Role: {{ roleName }}</h2>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">Name</th>
            <th class="py-2 px-4 border-b text-left">Email</th>
            <th class="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="py-2 px-4 border-b text-left">{{ user.name }}</td>
            <td class="py-2 px-4 border-b text-left">{{ user.email }}</td>
            <td class="py-2 px-4 border-b text-left">
              <button
                v-if="roleName !== 'owner'"
                @click="editUser(user)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                <Icon icon="mdi:pencil" class="w-4 h-4" />
              </button>
              <button
                v-if="roleName !== 'owner'"
                @click="confirmDeleteUser(user)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                <Icon icon="mdi:delete" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add User to Role Button -->
    <div class="mb-6">
      <button
        @click="showAddUserModal = true"
        class="bg-green-500 text-white px-4 py-2 rounded"
        v-if="roleName !== 'default role'"
      >
        Add User to {{ roleName }}
      </button>
    </div>

    <!-- Edit User Modal -->
<div
  v-if="showEditUserModal"
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
>
  <div class="bg-white p-6 rounded shadow-lg">
    <h2 class="text-xl mb-4">Edit User</h2>
    <form @submit.prevent="submitUpdatedUser">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          v-model="editedUser.name"
          type="text"
          id="name"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          v-model="editedUser.email"
          type="email"
          id="email"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          disabled
          required
        />
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          @click="closeEditUserModal"
          class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>


    <!-- Delete User Confirmation Modal -->
    <div
      v-if="showConfirmUserModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Confirm Delete</h2>
        <p>
          Are you sure you want to delete the user "{{ userToDelete.name }}"?
        </p>
        <div class="flex justify-end mt-4">
          <button
            type="button"
            @click="closeConfirmUserModal"
            class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="handleDeleteUser"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div
      v-if="showAddUserModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl mb-4">Add User to {{ roleName }}</h2>
        <div class="mb-4">
          <label
            for="searchUser"
            class="block text-sm font-medium text-gray-700"
            >Search User</label
          >
          <input
            v-model="searchTerm"
            type="text"
            id="searchUser"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Search by name or email"
          />
        </div>
        <div class="max-h-64 overflow-y-auto">
          <table class="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b text-left">Name</th>
                <th class="py-2 px-4 border-b text-left">Email</th>
                <th class="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="py-2 px-4 border-b text-left">{{ user.name }}</td>
                <td class="py-2 px-4 border-b text-left">{{ user.email }}</td>
                <td
                  class="py-2 px-4 border-b text-left"
                  v-if="roleName !== 'owner'"
                >
                  <button
                    @click="addUserToRole(user)"
                    class="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end mt-4">
          <button
            type="button"
            @click="closeAddUserModal"
            class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import {
  getUsersByRole,
  updateUser,
  deleteUser,
  getUsers,
} from "../../../services/userService";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const roleName = ref("");
const users = ref([]);
const allUsers = ref([]);
const editedUser = ref({ id: null, name: "", email: "" });
const showEditUserModal = ref(false);
const showConfirmUserModal = ref(false);
const showAddUserModal = ref(false);
const userToDelete = ref(null);
const searchTerm = ref("");

const fetchUsers = async (roleId) => {
  try {
    const response = await getUsersByRole(roleId);
    users.value = response.data.users;
    roleName.value = response.data.roleName;
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

const fetchAllUsers = async () => {
  try {
    const response = await getUsers();
    allUsers.value = response.data;
  } catch (error) {
    console.error("Failed to load all users:", error);
  }
};

const editUser = (user) => {
  editedUser.value = { ...user };
  showEditUserModal.value = true;
};

const submitUpdatedUser = async () => {
  try {
    await updateUser(editedUser.value.id, {
      name: editedUser.value.name,
      email: editedUser.value.email,
    });
    await fetchUsers(route.params.roleId);
    closeEditUserModal();
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

const goBack = () => {
  router.back();
};

const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  showConfirmUserModal.value = true;
};

const handleDeleteUser = async () => {
  try {
    if (userToDelete.value) {
      await deleteUser(userToDelete.value.id);
      await fetchUsers(route.params.roleId);
      closeConfirmUserModal();
    }
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

const closeEditUserModal = () => {
  showEditUserModal.value = false;
};

const closeConfirmUserModal = () => {
  showConfirmUserModal.value = false;
};

const closeAddUserModal = () => {
  showAddUserModal.value = false;
};

const addUserToRole = async (user) => {
  try {
    await updateUser(user.id, { role_id: route.params.roleId });
    await fetchUsers(route.params.roleId);
    closeAddUserModal();
  } catch (error) {
    console.error("Failed to add user to role:", error);
  }
};

const filteredUsers = computed(() => {
  return allUsers.value.filter((user) => {
    const isNotInRole = !users.value.some((u) => u.id === user.id);
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase());
    return isNotInRole && matchesSearch;
  });
});

onMounted(async () => {
  await fetchUsers(route.params.roleId);
  await fetchAllUsers();
});
</script>

<style scoped>
/* Styling for modal */
.fixed {
  z-index: 10;
}
</style>
