<template>
  <section id="feeds" class="flex justify-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-20">
      <div class="flex flex-col items-center space-y-6">
        <div v-for="post in posts" :key="post.id" class="w-full">
          <Post :post="post" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import Post from "@/components/Post.vue";

export default {
  components: { Post },
  setup() {
    const posts = ref([
      {
        id: 1,
        user: { name: "Amiw", avatar: "amiw.jpg" },
        content: "ASLII INI SERU BANGET 🔥",
        image: "dune.jpg",
        createdAt: "2025-03-20",
        comments: [
          { id: 101, user: { name: "Rizki" }, content: "Fix masuk wishlist!" },
          { id: 102, user: { name: "Siti" }, content: "Bener banget!" },
        ],
      },
      {
        id: 2,
        user: { name: "Bayu", avatar: "bayu.jpg" },
        content: "Baru kelar baca ini, mind-blowing 🤯",
        image: "book2.jpg",
        createdAt: "2025-03-19",
        comments: [
          { id: 103, user: { name: "Dewi" }, content: "Gila sih ini!" },
          { id: 104, user: { name: "Fajar" }, content: "Wajib baca!" },
        ],
      },
      {
        id: 3,
        user: { name: "Sari", avatar: "sari.jpg" },
        content: "Novel ini bikin nangis! 😭💔",
        image: "book3.jpg",
        createdAt: "2025-03-18",
        comments: [
          { id: 105, user: { name: "Nia" }, content: "Fix baca ini!" },
          { id: 106, user: { name: "Hadi" }, content: "Kenapa sedih?" },
        ],
      },
    ]);

    return { posts };
  },
};
</script>

<style scoped>
/* Memastikan post lebih besar */
.post-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}
</style>
