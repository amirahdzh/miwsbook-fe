<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>

    <h1 class="text-2xl font-bold mb-4">Edit book</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="book.title"
          type="text"
          id="title"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          v-model="book.summary"
          id="summary"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select
          v-model="book.category_id"
          id="category"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          v-model="book.stock"
          type="number"
          id="stock"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
        <div class="relative mb-2">
          <!-- Show preview of selected image -->
          <img v-if="previewUrl" :src="previewUrl" alt="Image Preview" class="w-32 h-32 object-cover border border-gray-300 rounded-md"/>
          <!-- Show existing image if available and preview URL is not set -->
          <img v-else-if="book.image" :src="book.image" alt="Current Image" class="w-32 h-32 object-cover border border-gray-300 rounded-md"/>
          <!-- File input -->
          <input
            type="file"
            @change="handleFileChange"
            id="image"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBookById, updateBook } from "../../../services/bookService";
import { getCategories } from "../../../services/categoryService";

const route = useRoute();
const router = useRouter();
const book = ref({
  title: "",
  summary: "",
  category_id: "",
  stock: "",
  image: null,
});
const categories = ref([]);
const imageFile = ref(null);
const previewUrl = ref(null);
const errors = ref([]);

const fetchBook = async () => {
  try {
    const response = await getBookById(route.params.id);
    book.value = response.data;
    // Set initial preview URL if image exists
    if (book.value.image) {
      previewUrl.value = book.value.image;
    }
  } catch (error) {
    console.error("Failed to load book:", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    // Create a preview URL for the selected file
    previewUrl.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", book.value.title);
    formData.append("summary", book.value.summary);
    formData.append("category_id", book.value.category_id);
    formData.append("stock", book.value.stock);
    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    //Cek Data
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    await updateBook(route.params.id, formData);

    router.push("/owner/books");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = Object.values(error.response.data.errors).flat();
      console.error("Validation errors:", error.response.data.errors);
    } else {
      console.error("Failed to update book:", error);
    }
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchBook();
  fetchCategories();
});
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
