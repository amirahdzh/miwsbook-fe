<template>
  <div class="admin-layout flex">
    <!-- Sidebar -->
    <aside
      :class="{
        'w-64': !isSidebarCollapsed,
        'w-20': isSidebarCollapsed,
      }"
      class="bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 shadow-lg"
    >
      <!-- Sidebar Header -->
      <div
        class="flex items-center justify-between p-4 border-b border-gray-700"
      >
        <RouterLink to="/owner/dashboard" class="flex items-center space-x-2">
          <Icon icon="mdi:library-shelves" class="w-6 h-6 text-yellow-400" />
          <span v-if="!isSidebarCollapsed" class="text-lg font-semibold"
            >Owner Panel</span
          >
        </RouterLink>
        <button
          @click="toggleSidebar"
          class="text-gray-400 hover:text-white focus:outline-none transition-all"
        >
          <Icon
            :icon="isSidebarCollapsed ? 'mdi:menu-open' : 'mdi:menu'"
            class="w-6 h-6"
          />
        </button>
      </div>

      <!-- Sidebar Menu -->
      <nav class="flex-1 flex flex-col overflow-y-auto">
        <ul class="mt-4 space-y-1">
          <SidebarItem
            to="/owner/dashboard"
            icon="mdi:view-dashboard"
            text="Dashboard"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
          <SidebarItem
            to="/owner/books"
            icon="mdi:book"
            text="Books"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
          <SidebarItem
            to="/owner/categories"
            icon="mdi:tag-multiple"
            text="Categories"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
          <SidebarItem
            to="/owner/borrows"
            icon="mdi:clipboard-text-clock"
            text="Borrows"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
          <SidebarItem
            to="/owner/roles"
            icon="mdi:account-group"
            text="Roles"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
          <SidebarItem
            to="/owner/feeds"
            icon="mdi:rss"
            text="Feeds"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
          <SidebarItem
            to="/owner/feeds"
            icon="mdi:feather"
            text="Authors"
            :isSidebarCollapsed="isSidebarCollapsed"
          />
        </ul>
      </nav>

      <!-- Home Button -->
      <div class="mt-auto border-t border-gray-700">
        <SidebarItem
          to="/"
          icon="mdi:home"
          text="Home"
          :isSidebarCollapsed="isSidebarCollapsed"
        />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import SidebarItem from "@/components/SidebarItem.vue"; // Import SidebarItem

// Sidebar State
const isSidebarCollapsed = ref(false);

// Function: Handle Responsive Sidebar
const handleResize = () => {
  isSidebarCollapsed.value = window.innerWidth < 1024; // Collapse sidebar on small screens
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// Initial check on mount
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh; /* Full viewport height */
}

/* Sidebar Hover Effect */
aside:hover {
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.1);
}

/* Smooth transition for layout */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
