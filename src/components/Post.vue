<template>
  <div class="post">
    <!-- Post Header -->
    <div class="post-header">
      <img :src="avatarSrc" class="avatar" alt="User Avatar" />
      <div class="user-info">
        <strong>{{ userName }}</strong>
        <span class="post-date">· {{ formattedDate }}</span>
      </div>
    </div>

    <!-- Post Content -->
    <p class="post-content">{{ content }}</p>

    <!-- Multiple Images -->
    <div class="post-image-container" v-if="postImages.length">
      <div
        v-for="(image, index) in limitedImages"
        :key="index"
        class="post-image-wrapper"
        @click="openImage(image)"
      >
        <img :src="image" class="post-image" alt="Post Image" />
        <div v-if="postImages.length > 4 && index === 3" class="more-images">
          +{{ postImages.length - 4 }}
        </div>
      </div>
    </div>

    <!-- Post Actions -->
    <div class="post-actions">
      <button class="action-button" @click="toggleLike">❤️ {{ likes }}</button>
      <button class="action-button">💬 {{ comments.length }}</button>
    </div>

    <!-- Modal Image Viewer -->
    <div
      v-if="selectedImage"
      class="modal fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click="selectedImage = null"
    >
      <img
        :src="selectedImage"
        class="max-w-full max-h-full rounded-lg shadow-lg"
        alt="Full Size Image"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const defaultAvatar = "/img/miw.jpg"; // Gambar default Twitter-like

    // Hardcoded user data
    const userAvatar = ""; // Kosong untuk mengetes default avatar
    const userName = "Amiw";
    const postDate = "2024-03-20";
    const content =
      "BUKU INI BAGUS BANGETTTT! 📖✨\nWajib baca buat yang suka petualangan dan filosofi!";

    // Menampilkan banyak gambar
    const postImages = ref([
      "/img/alkemis.jpg",
      //   "https://via.placeholder.com/600x300",
      //   "https://via.placeholder.com/400x400",
      //   "https://via.placeholder.com/500x250",
      //   "https://via.placeholder.com/300x300", // Gambar ke-5 tidak akan ditampilkan
    ]);

    const comments = ref([
      { id: 1, user: "Alice", text: "Postingan yang menarik!" },
      { id: 2, user: "Bob", text: "Saya setuju dengan ini!" },
    ]);

    // Like system
    const likes = ref(10);
    const liked = ref(false);

    const toggleLike = () => {
      liked.value = !liked.value;
      likes.value += liked.value ? 1 : -1;
    };

    const avatarSrc = computed(() => {
      return userAvatar.trim() ? userAvatar : defaultAvatar;
    });

    // Format tanggal
    const formattedDate = computed(() => {
      return new Date(postDate).toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      });
    });

    // Batasi gambar maksimal 4
    const limitedImages = computed(() => {
      return postImages.value.slice(0, 4);
    });

    // Modal Image Viewer
    const selectedImage = ref(null);
    const openImage = (image) => {
      selectedImage.value = image;
    };

    return {
      avatarSrc,
      userName,
      formattedDate,
      content,
      postImages,
      limitedImages,
      likes,
      toggleLike,
      comments,
      selectedImage,
      openImage,
    };
  },
};
</script>

<style scoped>
/* Mirip Twitter Feed */
.post {
  background: #fff;
  max-width: 550px;
  width: 100%;
  border-bottom: 1px solid #e1e8ed;
  padding: 12px 16px;
  font-family: system-ui, sans-serif;
}

/* Header lebih compact */
.post-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.post-date {
  font-size: 14px;
  color: gray;
  margin-left: 5px;
}

/* Konten */
.post-content {
  font-size: 15px;
  color: #333;
  white-space: pre-line; /* Agar line break pada text terlihat */
}

/* Gambar lebih mirip Twitter */
.post-image-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  gap: 5px;
  margin-top: 10px;
  border-radius: 12px;
  overflow: hidden;
}

.post-image-wrapper {
  position: relative;
  width: 100%;
}

.post-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

/* Jika lebih dari 4 gambar, tampilkan angka */
.more-images {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* Aksi post */
.post-actions {
  display: flex;
  justify-content: start;
  gap: 15px;
  margin-top: 10px;
}

.action-button {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  color: gray;
  transition: color 0.3s;
}

.action-button:hover {
  color: black;
}

/* Modal Image Viewer */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}
</style>
