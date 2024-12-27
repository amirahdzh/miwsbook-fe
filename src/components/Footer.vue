<template>
  <footer class="bg-dark text-white pt-12">
    <div class="container mx-auto flex flex-wrap justify-between">
      <!-- Footer Left -->
      <div class="w-full md:w-1/3 mb-6 md:mb-0">
        <h2 class="text-2xl font-bold mb-4 font-dellarespira">Book World</h2>
        <p class="text-lg mb-4 mr-8">Explore a world of books with us. Discover, read, and enjoy the journey of every page.</p>
        <div class="flex space-x-4">
          <a href="https://facebook.com" target="_blank" class="text-white hover:text-primary transition-colors">
            <Icon icon="mdi:facebook" class="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" class="text-white hover:text-primary transition-colors">
            <Icon icon="mdi:twitter" class="w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" class="text-white hover:text-primary transition-colors">
            <Icon icon="mdi:instagram" class="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" class="text-white hover:text-primary transition-colors">
            <Icon icon="mdi:linkedin" class="w-6 h-6" />
          </a>
        </div>
      </div>
      
      <!-- Footer Center -->
      <div class="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
        <ul>
          <li><RouterLink to="/" class="hover:text-primary transition-colors">Home</RouterLink></li>
          <li><RouterLink to="/books" class="hover:text-primary transition-colors">Books</RouterLink></li>
          <li><RouterLink to="/categories" class="hover:text-primary transition-colors">Categories</RouterLink></li>
          <li><RouterLink to="/my-borrows" class="hover:text-primary transition-colors">My Borrows</RouterLink></li>
        </ul>
      </div>
      
      <!-- Footer Right -->
      <div class="w-full md:w-1/3">
        <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
        <p class="mb-2"><Icon icon="mdi:map-marker" class="w-5 h-5 inline mr-2" /> 123 Book Street, Reading City</p>
        <p class="mb-2"><Icon icon="mdi:phone" class="w-5 h-5 inline mr-2" /> (123) 456-7890</p>
        <p><Icon icon="mdi:email" class="w-5 h-5 inline mr-2" /> support@bookworld.com</p>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="bg-gray-800 text-center mt-8 py-4">
      <p class="text-sm">© 2024 Book World. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<style scoped>
/* Additional styles if needed */
</style>
