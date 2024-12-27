<template>
  <div class="admin-layout flex">
    <!-- Sidebar -->
    <aside
      :class="{
        'w-64': !isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens,
        'w-20': isSidebarCollapsed || isSidebarCollapsedOnSmallScreens,
      }"
      class="bg-gray-800 text-white h-screen flex flex-col transition-width duration-300"
    >
      <div class="flex items-center justify-between p-4">
        <RouterLink to="/owner/dashboard" class="block p-4 text-lg">
          <div class="flex items-center">
            <span
              v-if="!isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens"
              >Owner Panel</span
            >
          </div>
        </RouterLink>
        <button
          @click="toggleSidebar"
          class="text-gray-400 hover:text-white focus:outline-none"
        >
          <Icon
            :icon="
              isSidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'
            "
            class="w-6 h-6"
          />
        </button>
      </div>
      <nav class="flex-1 flex flex-col overflow-y-auto">
        <ul class="mt-4">
          <!-- Movies Icon -->
          <li>
            <RouterLink
              to="/owner/books"
              class="block p-4 hover:bg-gray-700"
              :class="{ 'bg-gray-600': isActive('/owner/books') }"
            >
              <div class="flex items-center">
                <Icon icon="mdi:book" class="w-6 h-6 mr-3" />
                <span
                  v-if="
                    !isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens
                  "
                  >Books</span
                >
              </div>
            </RouterLink>
          </li>
          <!-- Casts Icon -->
          <li>
            <RouterLink
              to="/owner/categories"
              class="block p-4 hover:bg-gray-700"
              :class="{ 'bg-gray-600': isActive('/owner/categories') }"
            >
              <div class="flex items-center">
                <Icon icon="mdi:category" class="w-6 h-6 mr-3" />
                <span
                  v-if="
                    !isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens
                  "
                  >Categories</span
                >
              </div>
            </RouterLink>
          </li>
          <!-- Genres Icon -->
          <li>
            <RouterLink
              to="/owner/borrows"
              class="block p-4 hover:bg-gray-700"
              :class="{ 'bg-gray-600': isActive('/owner/borrows') }"
            >
              <div class="flex items-center">
                <Icon icon="mdi:tag-multiple" class="w-6 h-6 mr-3" />
                <span
                  v-if="
                    !isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens
                  "
                  >Borrows</span
                >
              </div>
            </RouterLink>
          </li>
          <!-- Genres Icon -->
          <li>
            <RouterLink
              to="/owner/roles"
              class="block p-4 hover:bg-gray-700"
              :class="{ 'bg-gray-600': isActive('/owner/roles') }"
            >
              <div class="flex items-center">
                <Icon icon="mdi:person" class="w-6 h-6 mr-3" />
                <span
                  v-if="
                    !isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens
                  "
                  >Roles</span
                >
              </div>
            </RouterLink>
          </li>
        </ul>
        <!-- Home Icon (Moved to the Bottom) -->
        <div class="mt-auto">
          <RouterLink to="/" class="block p-4 hover:bg-gray-700">
            <div class="flex items-center">
              <Icon icon="mdi:home" class="w-6 h-6 mr-3" />
              <span
                v-if="!isSidebarCollapsed && !isSidebarCollapsedOnSmallScreens"
                >Home</span
              >
            </div>
          </RouterLink>
        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8 bg-gray-100 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

const isSidebarCollapsed = ref(false);
const isSidebarCollapsedOnSmallScreens = ref(false);
const route = useRoute();

const handleResize = () => {
  const mediumScreen = window.matchMedia("(max-width: 1024px)");
  isSidebarCollapsedOnSmallScreens.value = mediumScreen.matches;
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// Initial check
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

// Cleanup listener
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const isActive = (path) => {
  return route.path.startsWith(path);
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh; /* Full viewport height */
}
</style>
