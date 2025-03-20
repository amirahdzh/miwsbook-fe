import { createRouter, createWebHistory } from "vue-router";

// import views
import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import BookDetail from "../views/BookDetail.vue";
import Categories from "../views/Categories.vue";
import Feeds from "../views/Feeds.vue";
// import CategoryDetail from "../views/CategoryDetail.vue";
import BorrowBook from "../views/BorrowBook.vue";
import BorrowStatus from "../views/BorrowStatus.vue";
import Profile from "../views/Profile.vue";

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
import ManageUsers from "../views/owner/role/ManageUsers.vue";
import Dashboard from "../views/owner/Dashboard.vue";
// import ManageUsers from "../views/owner/role/ManageUsers.vue";

// Authentication Guard
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem("token");
  token ? next() : next("/login");
};

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/books", name: "Books", component: Books },
  { path: "/feeds", name: "Feeds", component: Feeds },
  { path: "/book/:id", name: "BookDetail", component: BookDetail },
  { path: "/categories", name: "Categories", component: Categories },
  // { path: "/category/:id", name: "CategoryDetail", component: CategoryDetail },
  { path: "/borrow-book", name: "BorrowBook", component: BorrowBook },
  {
    path: "/my-borrows",
    name: "BorrowStatus",
    component: BorrowStatus,
    meta: { requiresAuth: true }, // Optional: Only allow authenticated users
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
