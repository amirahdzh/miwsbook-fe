<template>
  <section id="home">
    <div class="max-w-7xl mx-auto px-6 sm:px-6 md:px-12 lg:px-20 py-20">
      <div class="flex flex-wrap min-w-screen">
        <!-- Bagian Kiri -->
        <div class="w-full self-center px-8 lg:w-1/2 py-20">
          <h1 class="text-base text-secondary md:text-xl">
            🌙 Explore My Realm of Dreams & Pages
            <span
              class="block font-bold text-dark text-3xl font-dellarespira lg:text-3xl xl:text-4xl mt-4"
            >
              📖 Welcome to
              <span class="text-primary font-bold font-dellarespira">
                {{ appName }} &nbsp;
              </span>
              - My Literary World
            </span>
          </h1>

          <p class="text-dark mt-4 leading-relaxed lg:text-lg">
            Step into my world of stories, book reviews, and hidden gems that
            shaped my journey. 🌿📚
          </p>

          <!-- CTA Buttons -->
          <div class="flex gap-4 mt-8">
            <!-- Explore Feeds -->
            <RouterLink to="/feeds" class="cta-button bg-primary">
              My Latest Reads
            </RouterLink>

            <!-- Browse Collection -->
            <RouterLink to="/books" class="cta-button bg-primary">
              My Library
            </RouterLink>
          </div>
        </div>

        <!-- Bagian Kanan (Gambar) -->
        <div class="w-full self-end px-4 lg:w-1/2">
          <div class="relative mt-10 lg:mt-9 lg:right-0">
            <div class="relative mt-10 lg:mt-9 lg:right-0 animate-floating">
              <img
                src="/img/book.png"
                alt="Books"
                class="max-w-full mx-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <!-- Search Bar -->
    <!-- <div class="flex justify-center my-6">
      <AutocompleteSearch class="mr-5" />
    </div> -->
  </section>
</template>

<script setup>
import { inject } from "vue";
import AutocompleteSearch from "@/components/AutoCompleteSearch.vue"; // Import komponen

const appName = inject("appName");
</script>

<style scoped>
/* Animasi Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

/* Animasi Floating */
@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-floating {
  animation: floating 3s ease-in-out infinite;
}

/* CTA Button Styling */
.cta-button {
  /* text-base; */
  color: white;
  padding: 12px 24px;
  border-radius: 15px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: hidden;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); */
}

.cta-button:hover {
  /* box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2); */
  transform: translateY(-3px);
}

/* Gradient Hover Effect */
/* .cta-button.bg-secondary:hover {
  background: linear-gradient(90deg, #f78da7, #ff5470);
} */

.cta-button.bg-primary:hover {
  background: linear-gradient(90deg, #f78da7, #ff5470);
}
</style>
