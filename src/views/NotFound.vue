<template>
  <div class="not-found-container">
    <h1 class="text-6xl font-bold text-primary">404</h1>
    <p class="text-lg text-dark mt-4">
      <span class="text-3xl">Oops!</span> <br />
      Halaman yang kamu cari tidak ditemukan.
    </p>
    <RouterLink
      to="/"
      class="mt-6 px-6 py-2 bg-primary text-gray-800 rounded-lg hover:opacity-80 transition"
    >
      Kembali ke Beranda
    </RouterLink>
  </div>
</template>

<style scoped>
.not-found-container {
  @apply min-h-screen flex flex-col items-center justify-center text-center;
  background: url("/img/maple.png") no-repeat center center/cover;
}
</style>
