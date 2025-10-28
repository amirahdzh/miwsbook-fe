<template>
  <div
    class="dashboard-view p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-slate-50 to-white min-h-[60vh]"
  >
    <div class="max-w-7xl mx-auto">
      <header
        class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 class="text-3xl font-extrabold text-slate-800">Dashboard</h1>
          <p class="text-sm text-slate-500 mt-1">
            Overview of books, borrows and categories
          </p>
        </div>
        <div class="text-sm text-slate-600">
          Last updated: <span class="font-medium">now</span>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          class="card group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 flex items-center gap-4"
        >
          <div
            class="icon w-14 h-14 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl"
          >
            <Icon icon="mdi:book-open-variant" />
          </div>
          <div class="flex-1">
            <div class="text-xs text-slate-500 uppercase tracking-wide">
              Total Books
            </div>
            <div class="text-3xl font-bold text-slate-800 mt-1">
              {{ formatNumber(totals.books) }}
            </div>
            <div class="text-sm text-slate-400 mt-1">
              All books in inventory
            </div>
          </div>
        </div>

        <div
          class="card group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 flex items-center gap-4"
        >
          <div
            class="icon w-14 h-14 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl"
          >
            <Icon icon="mdi:calendar-check" />
          </div>
          <div class="flex-1">
            <div class="text-xs text-slate-500 uppercase tracking-wide">
              Total Borrows
            </div>
            <div class="text-3xl font-bold text-slate-800 mt-1">
              {{ formatNumber(totals.borrows) }}
            </div>
            <div class="text-sm text-slate-400 mt-1">
              Borrow records to date
            </div>
          </div>
        </div>

        <div
          class="card group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 flex items-center gap-4"
        >
          <div
            class="icon w-14 h-14 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-2xl"
          >
            <Icon icon="mdi:shape" />
          </div>
          <div class="flex-1">
            <div class="text-xs text-slate-500 uppercase tracking-wide">
              Total Categories
            </div>
            <div class="text-3xl font-bold text-slate-800 mt-1">
              {{ formatNumber(totals.categories) }}
            </div>
            <div class="text-sm text-slate-400 mt-1">
              Distinct book categories
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { privateApi } from "@/utils/api";
import { Icon } from "@iconify/vue";

const totals = ref({
  books: 0,
  categories: 0,
  borrows: 0,
});

const fetchAllData = async (path) => {
  let data = [];
  let page = 1;
  const perPage = 100; // adjust as needed for your API

  while (true) {
    const response = await privateApi.get(path, {
      params: { page, per_page: perPage },
    });

    // support both { data: [...] } and { data: { data: [...] } } shapes
    const chunk = (response.data && response.data.data) || response.data || [];
    data = data.concat(chunk);

    if (!chunk || chunk.length < perPage) break;
    page++;
  }

  return data;
};

const fetchTotals = async () => {
  try {
    const books = await fetchAllData("/book");
    totals.value.books = books.length;
    const borrows = await fetchAllData("/borrow");
    totals.value.borrows = borrows.length;
    const categories = await fetchAllData("/category");
    totals.value.categories = categories.length;
  } catch (error) {
    console.error("Error fetching totals:", error);
  }
};

const formatNumber = (n) => {
  try {
    return new Intl.NumberFormat().format(n || 0);
  } catch (e) {
    return String(n || 0);
  }
};

onMounted(fetchTotals);
</script>

<style scoped>
.dashboard-view {
  width: 100%;
}

.card .icon {
  flex-shrink: 0;
}
</style>
