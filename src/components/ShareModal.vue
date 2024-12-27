<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold">Share this Book</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">
            <Icon icon="mdi:close" class="text-2xl" />
          </button>
        </div>
        <div class="mt-4">
          <p class="text-gray-700 mb-4">Share this book with your friends via:</p>
          <div class="flex space-x-4 justify-center">
            <button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-700">
              <Icon icon="mdi:facebook" class="text-2xl" />
            </button>
            <button class="bg-blue-400 text-white rounded-full p-2 hover:bg-blue-600">
              <Icon icon="mdi:twitter" class="text-2xl" />
            </button>
            <button class="bg-gray-600 text-white rounded-full p-2 hover:bg-gray-800">
              <Icon icon="mdi:email" class="text-2xl" />
            </button>
          </div>
          <div class="mt-4">
            <button @click="copyUrl" class="text-primary font-semibold">
              Copy URL
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Icon } from '@iconify/vue';
  
  const props = defineProps(['isVisible']);
  const emit = defineEmits(['close']);
  
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  };
  </script>
  
  <style scoped>
  /* Style for circular icons */
  button {
    border: 2px solid transparent;
  }
  
  button:hover {
    border-color: currentColor;
  }
  </style>
  