<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>

    <!-- Add Category Button -->
    <button
      @click="openAddModal"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4 flex items-center sm:space-x-2"
    >
      <Icon icon="mdi:plus" class="w-4 h-4" />
      <span class="hidden sm:inline">Add Category</span>
    </button>

    <!-- Display spinner while loading -->
    <Spinner v-if="isLoading" />

    <!-- Categories List -->
    <div class="mb-6" v-else>
      <h2 class="text-xl mb-2">Category List</h2>

      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">Category</th>
            <th class="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td class="py-2 px-4 border-b text-left">{{ category.name }}</td>
            <td class="py-2 px-4 border-b text-left">
              <!-- Show Edit button if the category is not "No Category" -->
              <button
                v-if="category.name !== 'No Category'"
                @click="editCategory(category)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                <Icon icon="mdi:pencil" class="w-4 h-4" />
              </button>
              <!-- Show Delete button if the category is not "No Category" -->
              <button
                v-if="category.name !== 'No Category'"
                @click="confirmDelete(category.id, category.name)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                <Icon icon="mdi:delete" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Category Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Add Category</h2>
        <form @submit.prevent="submitNewCategory">
          <div class="mb-4">
            <label
              for="new_category_name"
              class="block text-sm font-medium text-gray-700"
              >Category Name</label
            >
            <input
              v-model="newCategory.name"
              type="text"
              id="new_category_name"
              class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeAddModal"
              class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Category Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-xl mb-4">Edit Category</h2>
        <form @submit.prevent="submitUpdatedCategory">
          <div class="mb-4">
            <label
              for="category_name"
              class="block text-sm font-medium text-gray-700"
              >Category Name</label
            >
            <input
              v-model="editedCategory.name"
              type="text"
              id="category_name"
              class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeEditModal"
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
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { Icon } from "@iconify/vue";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/categoryService";
import Spinner from "../../../components/Spinner.vue";

const categories = ref([]);
const newCategory = ref({ name: "" });
const editedCategory = ref({ id: null, name: "" });
const showAddModal = ref(false);
const showEditModal = ref(false);

const isLoading = inject("isLoading");

const fetchCategories = async () => {
  try {
    isLoading.value = true;
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  } finally {
    isLoading.value = false;
  }
};

const openAddModal = () => {
  newCategory.value = { name: "" };
  showAddModal.value = true;
};

const submitNewCategory = async () => {
  try {
    await addCategory(newCategory.value);
    await fetchCategories();
    closeAddModal();
  } catch (error) {
    console.error("Failed to add category:", error);
  }
};

const editCategory = (category) => {
  editedCategory.value = { ...category };
  showEditModal.value = true;
};

const submitUpdatedCategory = async () => {
  try {
    await updateCategory(editedCategory.value.id, {
      name: editedCategory.value.name,
    });
    await fetchCategories();
    closeEditModal();
  } catch (error) {
    console.error("Failed to update category:", error);
  }
};

const confirmDelete = (id, name) => {
  if (
    confirm(
      `Are you sure you want to delete the category "${name}"? Deleting this category will move all books to the "No Category" category.`
    )
  ) {
    removeCategory(id);
  }
};

const removeCategory = async (id) => {
  try {
    await deleteCategory(id);
    await fetchCategories();
  } catch (error) {
    console.error("Failed to delete category:", error);
  }
};

const closeAddModal = () => {
  showAddModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
