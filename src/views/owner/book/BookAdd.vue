<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>

    <h1 class="text-2xl font-bold mb-4">Add book</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title</label
        >
        <input
          v-model="book.title"
          type="text"
          id="title"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="summary" class="block text-sm font-medium text-gray-700"
          >Summary</label
        >
        <textarea
          v-model="book.summary"
          id="summary"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="categories" class="block text-sm font-medium text-gray-700">
          Categories
        </label>
        <select
          v-model="book.categories"
          id="categories"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          multiple
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="stock" class="block text-sm font-medium text-gray-700"
          >Stock</label
        >
        <input
          v-model="book.stock"
          type="number"
          id="stock"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700"
          >image</label
        >
        <input
          type="file"
          @change="handleFileChange"
          id="image"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add book
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCategories } from "../../../services/categoryService";
import { addBook } from "../../../services/bookService";

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
const errors = ref([]);

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", book.value.title);
    formData.append("summary", book.value.summary);
    formData.append("stock", book.value.stock);
    formData.append("category_id", book.value.category_id);
    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    // Debugging log
    console.log("Form Data:", {
      title: book.value.title,
      summary: book.value.summary,
      stock: book.value.stock,
      category_id: book.value.category_id,
      image: imageFile.value,
    });

    await addBook(formData);
    router.push("/owner/books");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = Object.values(error.response.data.errors).flat();
      console.error("Validation errors:", error.response.data.errors);
    } else {
      console.error("Failed to add book:", error);
    }
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
