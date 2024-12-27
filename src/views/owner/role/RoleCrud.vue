<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Roles</h1>

    <!-- Add Role Button -->
    <button
      @click="openAddModal"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4 flex items-center sm:space-x-2"
    >
      <Icon icon="mdi:plus" class="w-4 h-4" />
      <span class="hidden sm:inline">Add Role</span>
    </button>

    <!-- Display spinner while loading -->
    <Spinner v-if="isLoading" />

    <!-- Roles List -->
    <div class="mb-6" v-else>
      <h2 class="text-xl mb-2">Role List</h2>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">Role</th>
            <th class="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td class="py-2 px-4 border-b text-left">{{ role.name }}</td>
            <td class="py-2 px-4 border-b text-left">
              <button
                v-if="role.name !== 'owner' && role.name !== 'default role'"
                @click="editRole(role)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                <Icon icon="mdi:pencil" class="w-4 h-4" />
              </button>
              <button
                v-if="role.name !== 'owner' && role.name !== 'default role'"
                @click="confirmDelete(role)"
                class="bg-red-500 text-white px-2 py-1 rounded mr-2"
              >
                <Icon icon="mdi:delete" class="w-4 h-4" />
              </button>
              <button
                @click="manageUsers(role)"
                class="bg-blue-500 text-white px-2 py-1 rounded"
              >
                <Icon icon="mdi:account-group" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Role Modal -->
    <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Add Role</h2>
        <form @submit.prevent="submitNewRole">
          <div class="mb-4">
            <label for="new_role_name" class="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              v-model="newRole.name"
              type="text"
              id="new_role_name"
              class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeAddModal" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
              Add Role
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Edit Role</h2>
        <form @submit.prevent="submitUpdatedRole">
          <div class="mb-4">
            <label for="role_name" class="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              v-model="editedRole.name"
              type="text"
              id="role_name"
              class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete the role "{{ roleToDelete.name }}"? Deleting this role will move users with this role to the "default role".</p>
        <div class="flex justify-end mt-4">
          <button type="button" @click="closeConfirmModal" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button type="button" @click="handleDeleteRole" class="bg-red-500 text-white px-4 py-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { Icon } from "@iconify/vue";
import { getRoles, createRole, updateRole, deleteRole } from "../../../services/roleService";
import { useRouter } from "vue-router";
import Spinner from "../../../components/Spinner.vue";

const roles = ref([]);
const newRole = ref({ name: "" });
const editedRole = ref({ id: null, name: "" });
const showAddModal = ref(false);
const showEditModal = ref(false);
const showConfirmModal = ref(false);
const roleToDelete = ref(null);
const router = useRouter();

const isLoading = inject("isLoading");

const fetchRoles = async () => {
  try {
    const response = await getRoles();
    roles.value = response.data;
  } catch (error) {
    console.error("Failed to load roles:", error);
  } finally {
    isLoading.value = false;
  }
};

const openAddModal = () => {
  newRole.value = { name: "" };
  showAddModal.value = true;
};

const submitNewRole = async () => {
  try {
    await createRole(newRole.value);
    await fetchRoles();
    closeAddModal();
  } catch (error) {
    console.error("Failed to add role:", error);
  }
};

const editRole = (role) => {
  editedRole.value = { ...role };
  showEditModal.value = true;
};

const submitUpdatedRole = async () => {
  try {
    await updateRole(editedRole.value.id, { name: editedRole.value.name });
    await fetchRoles();
    closeEditModal();
  } catch (error) {
    console.error("Failed to update role:", error);
  }
};

const confirmDelete = (role) => {
  roleToDelete.value = role;
  showConfirmModal.value = true;
};

const handleDeleteRole = async () => {
  try {
    if (roleToDelete.value) {
      await deleteRole(roleToDelete.value.id);
      await fetchRoles();
      closeConfirmModal();
    }
  } catch (error) {
    console.error("Failed to delete role:", error);
  }
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const closeConfirmModal = () => {
  showConfirmModal.value = false;
};

const manageUsers = (role) => {
  router.push({ name: 'ManageUsers', params: { roleId: role.id } });
};

onMounted(() => {
  fetchRoles();
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
