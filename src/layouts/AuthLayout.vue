<template>
  <div class="auth-layout flex flex-col min-h-screen relative">
    <div class="background-image"></div>
    <main class="flex-grow relative z-10">
      <slot />
    </main>
    <div class="designed-by">Designed by Freepik</div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/img/auth-bg.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(3px);
  z-index: -1;
}

.designed-by {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: black;
  opacity: 0.8;
  z-index: 10;
}
</style>
