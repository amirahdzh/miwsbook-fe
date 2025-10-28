<template>
  <footer class="bg-gray-900 text-white pt-12">
    <div
      class="container mx-auto pb-10 px-6 lg:px-16 flex flex-wrap justify-between gap-x-12"
    >
      <!-- Footer Left -->
      <div class="w-full md:w-1/4 mb-8 md:mb-0">
        <h2 class="text-2xl font-bold mb-4">Miw's Book</h2>
        <p class="text-gray-400 mb-4">
          Step into my world of stories, book reviews, and hidden gems that
          shaped my journey. 🌿📚
        </p>
        <div class="flex space-x-4">
          <a
            href="https://facebook.com/amiwdzh"
            target="_blank"
            class="text-gray-400 hover:text-primary transition-colors"
          >
            <Icon icon="mdi:facebook" class="w-6 h-6" />
          </a>
          <a
            href="https://amiw.dev/"
            target="_blank"
            class="text-gray-400 hover:text-primary transition-colors"
          >
            <Icon icon="mdi:web" class="w-6 h-6" />
          </a>
          <a
            href="https://medium.com/@amiwdzh"
            target="_blank"
            class="text-gray-400 hover:text-primary transition-colors"
          >
            <Icon icon="mdi:medium" class="w-6 h-6" />
          </a>
        </div>
      </div>

      <!-- Footer Center -->
      <div class="w-full md:w-1/4 mb-8 md:mb-0">
        <h3 class="text-lg font-semibold text-white mb-4">Navigation</h3>
        <ul class="space-y-2">
          <li>
            <RouterLink
              to="/"
              class="text-gray-400 hover:text-primary transition-colors"
              >Homepage</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/books"
              class="text-gray-400 hover:text-primary transition-colors"
              >Collections</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/feeds"
              class="text-gray-400 hover:text-primary transition-colors"
              >Feeds</RouterLink
            >
          </li>
          <!-- <li>
            <RouterLink
              to="/my-borrows"
              class="text-gray-400 hover:text-primary transition-colors"
              >Pinjaman Saya</RouterLink
            >
          </li> -->
        </ul>
      </div>

      <!-- Footer Right -->
      <div class="w-full md:w-1/4">
        <h3 class="text-lg font-semibold text-white mb-4">Call Me</h3>
        <p class="text-gray-400 mb-2">
          <Icon icon="mdi:map-marker" class="w-5 h-5 inline mr-2" /> Sukajadi,
          Bandung
        </p>
        <p class="text-gray-400 mb-2">
          <Icon icon="mdi:phone" class="w-5 h-5 inline mr-2" /> +62 82114643544
        </p>
        <p class="text-gray-400">
          <Icon icon="mdi:email" class="w-5 h-5 inline mr-2" />
          amirahdzh@gmail.com
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.text-primary {
  color: #f472b6; /* Sesuaikan dengan tema */
}
</style>
