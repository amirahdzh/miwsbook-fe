<template>
  <li>
    <RouterLink
      :to="to"
      class="flex items-center px-4 py-3 rounded-lg transition-all"
      :class="isActive ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-700'"
    >
      <Icon :icon="icon" class="w-6 h-6 mr-3 text-white" />
      <span v-if="!isSidebarCollapsed" class="text-white font-medium">{{
        text
      }}</span>
    </RouterLink>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

// Props
defineProps({
  to: String,
  icon: String,
  text: String,
  isSidebarCollapsed: Boolean,
});

// Menentukan apakah link aktif
const route = useRoute();
const isActive = computed(() => route.path.startsWith(route.params.to));
</script>
