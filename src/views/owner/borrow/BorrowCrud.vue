<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Borrows</h1>

    <!-- Display spinner while loading -->
    <Spinner v-if="isLoading" />

    <!-- Display table when not loading -->
    <div v-else>
      <!-- Borrows List -->
      <div class="mb-6">
        <h2 class="text-xl mb-2">Borrow List</h2>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left">User</th>
              <th class="py-2 px-4 border-b text-left">Book</th>
              <th class="py-2 px-4 border-b text-left">Borrow Date</th>
              <th class="py-2 px-4 border-b text-left">Return Date</th>
              <th class="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrow in borrows" :key="borrow.id">
              <td class="py-2 px-4 border-b text-left">{{ borrow.user.name }}</td>
              <td class="py-2 px-4 border-b text-left">{{ borrow.book.title }}</td>
              <td class="py-2 px-4 border-b text-left">{{ formatDate(borrow.borrow_date) }}</td>
              <td class="py-2 px-4 border-b text-left">{{ formatDate(borrow.return_date) }}</td>
              <td class="py-2 px-4 border-b text-left">
                <button @click="editBorrow(borrow)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  <Icon icon="mdi:pencil" class="w-4 h-4" />
                </button>
                <button @click="removeBorrow(borrow.id)" class="bg-red-500 text-white px-2 py-1 rounded">
                  <Icon icon="mdi:delete" class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Edit Borrow Modal -->
      <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-lg">
          <h2 class="text-xl mb-4">Edit Borrow</h2>
          <form @submit.prevent="submitUpdatedBorrow">
            <div class="mb-4">
              <label for="return_date" class="block text-sm font-medium text-gray-700">Return Date</label>
              <input
                v-model="editedBorrow.return_date"
                type="date"
                id="return_date"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { Icon } from "@iconify/vue";
import { getBorrows, updateBorrow as updateBorrowService, deleteBorrow } from "../../../services/borrowService";
import Spinner from "../../../components/Spinner.vue";

const borrows = ref([]);
const editedBorrow = ref({ id: null, return_date: "" });
const showEditModal = ref(false);
const isLoading = inject('isLoading');

const fetchBorrows = async () => {
  isLoading.value = true;
  try {
    const response = await getBorrows();
    borrows.value = response.data;
  } catch (error) {
    console.error("Failed to load borrows:", error);
  } finally {
    isLoading.value = false;
  }
};

const editBorrow = (borrow) => {
  editedBorrow.value = { ...borrow };
  showEditModal.value = true;
};

const submitUpdatedBorrow = async () => {
  isLoading.value = true;
  try {
    await updateBorrowService(editedBorrow.value.id, { return_date: editedBorrow.value.return_date });
    await fetchBorrows();
    closeEditModal();
  } catch (error) {
    console.error("Failed to update borrow:", error);
  } finally {
    isLoading.value = false;
  }
};

const removeBorrow = async (id) => {
  isLoading.value = true;
  try {
    await deleteBorrow(id);
    await fetchBorrows();
  } catch (error) {
    console.error("Failed to delete borrow:", error);
  } finally {
    isLoading.value = false;
  }
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchBorrows();
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
