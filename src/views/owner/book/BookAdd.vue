<template>
  <div class="p-6">
    <!-- Back button -->
    <button @click="goBack" class="text-blue-500 hover:underline mb-4">
      &larr; Back
    </button>

    <h1 class="text-2xl font-bold mb-4">Add Book</h1>
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

      <!-- Select Categories (Checkbox) -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Categories</label
        >
        <div class="mt-1 space-y-2">
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :id="'category-' + category.id"
              :value="category.id"
              v-model="book.category_ids"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label :for="'category-' + category.id" class="ml-2 text-gray-700">
              {{ category.name }}
            </label>
          </div>
        </div>
        <button
          @click="addCategory"
          type="button"
          class="mt-2 text-blue-500 hover:underline"
        >
          + Add More Category
        </button>
      </div>

      <!-- Select Authors (Checkbox, sama seperti category) -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Authors</label>
        <div class="mt-1 space-y-2">
          <div
            v-for="author in authors"
            :key="author.id"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :id="'author-' + author.id"
              :value="author.id"
              v-model="book.author_ids"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label :for="'author-' + author.id" class="ml-2 text-gray-700">
              {{ author.name }}
            </label>
          </div>
        </div>
        <button
          @click="addAuthor"
          type="button"
          class="mt-2 text-blue-500 hover:underline"
        >
          + Add More Author
        </button>
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
          >Image</label
        >
        <input
          type="file"
          @change="handleFileChange"
          id="image"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add Book
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCategories } from "../../../services/categoryService";
import { getAuthors } from "../../../services/authorService";
import { addBook } from "../../../services/bookService";

const router = useRouter();
const book = ref({
  title: "",
  summary: "",
  category_ids: [],
  author_ids: [],
  stock: "",
  image: null,
});
const categories = ref([]);
const authors = ref([]);
const imageFile = ref(null);
const errors = ref([]);

// Fetch categories
const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

// Fetch authors
const fetchAuthors = async () => {
  try {
    const response = await getAuthors();
    console.log("Authors API Response:", response);

    if (Array.isArray(response.data)) {
      authors.value = response.data;
    } else {
      console.error("Unexpected data format for authors:", response.data);
    }
  } catch (error) {
    console.error("Failed to load authors:", error);
  }
};

// Tambahkan kategori manual
const addCategory = () => {
  const newCategory = prompt("Enter new category name:");
  if (newCategory) {
    const newCategoryId = Date.now().toString();
    categories.value.push({ id: newCategoryId, name: newCategory });
    book.value.category_ids.push(newCategoryId);
  }
};

// Tambahkan author manual
const addAuthor = () => {
  const newAuthor = prompt("Enter new author name:");
  if (newAuthor) {
    const newAuthorId = Date.now().toString();
    authors.value.push({ id: newAuthorId, name: newAuthor });
    book.value.author_ids.push(newAuthorId);
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

    book.value.category_ids.forEach((id) =>
      formData.append("category_ids[]", id)
    );
    book.value.author_ids.forEach((id) => formData.append("author_ids[]", id));

    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    console.log("Form Data:", Object.fromEntries(formData)); // Debugging

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

// Load data saat halaman dimuat
onMounted(() => {
  fetchCategories();
  fetchAuthors();
});
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
