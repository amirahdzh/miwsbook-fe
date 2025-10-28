<template>
  <div class="flex items-center">
    <!-- Render filled stars -->
    <svg
      v-for="index in filledStars"
      :key="'filled-' + index"
      class="w-6 h-6 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>

    <!-- Render half-filled star if rating is not an exact number -->
    <svg
      v-if="hasHalfStar"
      class="w-6 h-6 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="50%" style="stop-color: #fbbf24; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #d1d5db; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        fill="url(#grad1)"
      />
    </svg>

    <!-- Render empty stars -->
    <svg
      v-for="index in emptyStars"
      :key="'empty-' + index"
      class="w-6 h-6 text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>

    <!-- Display the rating as text -->
    <span class="ml-2 text-gray-600"
      >{{ rating.toFixed(1) }} / {{ maxStars }}</span
    >
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
});

const filledStars = computed(() => {
  return Math.floor(props.rating);
});

const hasHalfStar = computed(() => {
  return props.rating % 1 >= 0.5;
});

const emptyStars = computed(() => {
  return props.maxStars - filledStars.value - (hasHalfStar.value ? 1 : 0);
});
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
