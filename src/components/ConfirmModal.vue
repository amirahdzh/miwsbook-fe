<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-md shadow-lg">
        <h2 class="text-lg font-bold mb-4">{{ message }}</h2>
        <div class="flex justify-end space-x-4">
          <button @click="onConfirm" class="px-4 py-2 bg-teal-600 text-white rounded-md">Yes</button>
          <button @click="onCancel" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    isVisible: Boolean,
    message: String,
  });
  
  const emit = defineEmits(["confirm", "cancel"]);
  
  const onConfirm = () => {
    emit("confirm");
  };
  
  const onCancel = () => {
    emit("cancel");
  };
  </script>
  
  <style scoped>
  .confirm-modal {
    /* Custom styling for the modal */
  }
  </style>
  