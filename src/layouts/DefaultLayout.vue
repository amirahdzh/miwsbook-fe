<template>
    <div class="default-layout flex flex-col min-h-screen">
      <Header /> <!-- Tambahkan Header di sini -->
      <main class="flex-grow">
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";
  </script>
  
  <style scoped>
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>
  