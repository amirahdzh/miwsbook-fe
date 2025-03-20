import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import style NProgress

// Import views
import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import BookDetail from "../views/BookDetail.vue";
import Categories from "../views/Categories.vue";
import Feeds from "../views/Feeds.vue";
import BorrowBook from "../views/BorrowBook.vue";
import BorrowStatus from "../views/BorrowStatus.vue";
import Profile from "../views/Profile.vue";
import NotFound from "../views/NotFound.vue";

// Auth Routes
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

// Owner Routes
import BookCrud from "../views/owner/book/BookCrud.vue";
import BookAdd from "../views/owner/book/BookAdd.vue";
import BookEdit from "../views/owner/book/BookEdit.vue";
import CategoryCrud from "../views/owner/category/CategoryCrud.vue";
import BorrowCrud from "../views/owner/borrow/BorrowCrud.vue";
import RoleCrud from "../views/owner/role/RoleCrud.vue";
import FeedCrud from "../views/owner/feed/FeedCrud.vue";
import ManageUsers from "../views/owner/role/ManageUsers.vue";
import Dashboard from "../views/owner/Dashboard.vue";

// ✅ Function: Authentication Guard
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem("token");
  token ? next() : next("/login");
};

// ✅ Function: Admin Guard
// const requireAdmin = (to, from, next) => {
//   const userRole = localStorage.getItem("role"); // Misalnya, role disimpan di localStorage
//   if (userRole === "owner") {
//     next();
//   } else {
//     next("/"); // Redirect ke home jika bukan admin
//   }
// };

// Define Routes
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/books", name: "Books", component: Books },
  { path: "/feeds", name: "Feeds", component: Feeds },
  { path: "/book/:id", name: "BookDetail", component: BookDetail },
  { path: "/categories", name: "Categories", component: Categories },
  {
    path: "/borrow-book",
    name: "BorrowBook",
    component: BorrowBook,
    beforeEnter: (to, from, next) => {
      if (!to.query.bookId) {
        next("/books"); // Redirect ke halaman daftar buku jika tidak ada query parameter
      } else {
        next(); // Lanjutkan navigasi jika query parameter ada
      }
    },
  },

  {
    path: "/my-borrows",
    name: "BorrowStatus",
    component: BorrowStatus,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: requireAuth,
    meta: { requiresAuth: true },
  },

  // Auth Routes
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "auth", requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { layout: "auth", requiresGuest: true },
  },

  // Owner Routes
  {
    path: "/owner/books",
    name: "OwnerBooks",
    component: BookCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/books/add-book",
    name: "BookAdd",
    component: BookAdd,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/books/edit/:id",
    name: "BookEdit",
    component: BookEdit,
    props: true,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/categories",
    name: "OwnerCategories",
    component: CategoryCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/borrows",
    name: "OwnerBorrows",
    component: BorrowCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/roles",
    name: "RoleCrud",
    component: RoleCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/feeds",
    name: "FeedCrud",
    component: FeedCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/roles/manage-users/:roleId",
    name: "ManageUsers",
    component: ManageUsers,
    meta: { layout: "admin" },
  },
  {
    path: "/owner/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
    meta: { requiresAuth: true, requiresAdmin: true, layout: "admin" },
  },
  // Route 404
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll ke atas setiap kali berpindah ke halaman baru
    if (to.path === "/" || to.path === "/books" || to.path === "/feeds") {
      return { top: 0 };
    }
    return savedPosition || { top: 0 };
  },
});

// ✅ Tambahkan Loading Bar saat berpindah halaman
router.beforeEach((to, from, next) => {
  NProgress.start(); // Mulai loading bar
  const isAuthenticated = !!localStorage.getItem("token");

  // Jika halaman membutuhkan login dan user belum login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  }
  // Jika halaman hanya untuk guest, tetapi user sudah login, redirect ke home
  else if (to.meta.requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(); // Selesai loading bar
});

export default router;
