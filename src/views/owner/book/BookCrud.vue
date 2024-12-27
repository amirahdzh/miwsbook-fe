<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manage books</h1>
    <button
      @click="handleAdd"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4 flex items-center sm:space-x-2"
    >
      <Icon icon="mdi:add" class="w-4 h-4" />
      <span class="hidden sm:inline">Add Book</span>
    </button>

    <!-- Display spinner while loading -->
    <Spinner v-if="isLoading" />

    <!-- Display table when not loading -->
    <div v-else>
      <table class="w-full border border-gray-200">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-2 border-b">No</th>
            <th class="p-2 border-b">Cover</th>
            <th class="p-2 border-b">
              <span>Title</span>
              <button @click="toggleSort('title')">
                <Icon :icon="getSortIcon('title')" class="w-4 h-4" />
              </button>
            </th>
            <th class="p-2 border-b">
              <span>Category</span>
              <button @click="toggleSort('category')">
                <Icon :icon="getSortIcon('category')" class="w-4 h-4" />
              </button>
            </th>
            <th class="p-2 border-b">
              <span>Stock</span>
              <button @click="toggleSort('stock')">
                <Icon :icon="getSortIcon('stock')" class="w-4 h-4" />
              </button>
            </th>
            <th class="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in paginatedBooks" :key="book.id">
            <td class="p-2 border-b">{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td class="p-2 border-b">
              <img
                :src="book.image"
                alt="Cover Book"
                class=" object-cover w-20 h-32"
              />
            </td>
            <td class="p-2 border-b">{{ book.title }}</td>
            <td class="p-2 border-b">
              {{ book.category ? book.category.name : "N/A" }}
            </td>
            <td class="p-2 border-b">
              {{ book.stock }}
            </td>
            <td class="p-2 border-b">
              <button
                @click="handleEdit(book.id)"
                class="bg-blue-500 text-white px-1 py-1 my-1 mx-1 rounded"
              >
                <Icon icon="mdi:edit" class="w-6 h-6" />
              </button>
              <button
                @click="handleDelete(book.id)"
                class="bg-red-500 text-white px-1 py-1 my-1 mx-1 rounded"
              >
                <Icon icon="mdi:delete" class="w-6 h-6" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { getBooks, deleteBook as deleteBookService } from "../../../services/bookService";
import { Icon } from "@iconify/vue";
import Spinner from "../../../components/Spinner.vue";

const books = ref([]);
const currentPage = ref(1);
const perPage = ref(5);
const searchQuery = ref("");
const router = useRouter();
const sortOrder = ref({
  title: 'asc',
  category: '',
  stock: ''
});
const isLoading = inject('isLoading');

const fetchBooks = async () => {
  isLoading.value = true;
  try {
    const response = await getBooks();
    books.value = response.data;
  } catch (error) {
    console.error("Failed to load books:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleEdit = (id) => {
  router.push(`/owner/books/edit/${id}`);
};

const handleDelete = async (id) => {
  isLoading.value = true;
  try {
    await deleteBookService(id);
    fetchBooks(); // Refresh the list after deletion
  } catch (error) {
    console.error("Failed to delete book:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleAdd = () => {
  router.push("/owner/books/add-book");
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const searchBooks = () => {
  currentPage.value = 1; // Reset to first page on search
};

const toggleSort = (key) => {
  sortOrder.value[key] = sortOrder.value[key] === 'asc' ? 'desc' : 'asc';
  Object.keys(sortOrder.value).forEach(k => {
    if (k !== key) sortOrder.value[k] = '';
  });
};

const getSortIcon = (key) => {
  if (sortOrder.value[key] === 'asc') return 'mdi:arrow-up';
  if (sortOrder.value[key] === 'desc') return 'mdi:arrow-down';
  return 'mdi:unfold-more-horizontal';
};

const sortedBooks = computed(() => {
  let sorted = [...books.value];
  const key = Object.keys(sortOrder.value).find(k => sortOrder.value[k] !== '');
  if (key) {
    sorted.sort((a, b) => {
      let compareA = a[key];
      let compareB = b[key];
      
      if (key === 'category') {
        compareA = a.category ? a.category.name : '';
        compareB = b.category ? b.category.name : '';
      }
      
      if (key === 'stock') {
        compareA = a.stock;
        compareB = b.stock;
      }

      if (sortOrder.value[key] === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });
  }
  return sorted.filter(book =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return sortedBooks.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(sortedBooks.value.length / perPage.value);
});

onMounted(() => {
  fetchBooks();
});
</script>
