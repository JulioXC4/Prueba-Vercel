<template>
  <!-- Botón hamburguesa solo visible en pantallas pequeñas -->
  <button
      class="hamburger-button p-button p-button-text"
      @click="sidebarVisible = !sidebarVisible"
      v-show="isMobile"
  >
    <i class="pi pi-bars text-xl px-3 py-2"></i>
  </button>

  <aside
      class="sidebar"
      :class="{
    'sidebar--mobile-show': isMobile && sidebarVisible,
    'sidebar--mobile-hide': isMobile && !sidebarVisible
  }"
  >
    <div class="logo flex align-items-center gap-2 px-3 pt-4 pb-3">
      <img :src="logo" alt="Restock logo" class="logo-icon" />
      <span class="logo-text">Restock</span>
    </div>


    <ul class="menu list-none flex-auto p-0">
      <li v-for="item in menuItems" :key="item.route">
        <RouterLink
            :to="item.route"
            class="menu-link flex align-items-center gap-3 p-4 transition-colors border-left-3 border-transparent w-full"
            :class="{
            'menu-link--active': isActive(item.route)
          }"
        >
          <i :class="item.icon" class="text-lg"></i>
          <span class="line-height-none">{{ $t(item.label) }}</span>
        </RouterLink>
      </li>
    </ul>

    <div class="py-6 flex justify-content-center">
      <LanguageSwitcher />
    </div>
  </aside>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
import LanguageSwitcher from './language-switcher.component.vue'
import logo from '../../assets/logo-restock.png'
import { mockUser } from '../../shared/mocks/user.mock';

export default {
  name: 'Sidebar',
  components: { RouterLink, LanguageSwitcher },
  data() {
    return {
      logo,
      user: null,
      sidebarVisible: false,
      isMobile: window.innerWidth < 1260,
      menuItems: [], // se llenará según el rol
    }
  },
  created() {
      this.user = mockUser;

      const role = this.user.role_id?.name;

      if (role === 'supplier') {
        this.menuItems = [
          { label: 'sidebar.summary', icon: 'pi pi-chart-bar', route: '/dashboard/supplier/summary' },
          { label: 'sidebar.subscription', icon: 'pi pi-credit-card', route: '/dashboard/supplier/subscription' },
          { label: 'sidebar.inventory', icon: 'pi pi-box', route: '/dashboard/supplier/inventory' },
          { label: 'sidebar.alerts', icon: 'pi pi-bell', route: '/dashboard/supplier/alerts' },
          { label: 'sidebar.orders', icon: 'pi pi-truck', route: '/dashboard/supplier/orders' },
          { label: 'sidebar.ratings', icon: 'pi pi-star', route: '/dashboard/supplier/ratings' }
        ];
      } else if (role === 'restaurant') {
        this.menuItems = [
          { label: 'sidebar.summary', icon: 'pi pi-chart-bar', route: '/dashboard/restaurant/summary' },
          { label: 'sidebar.inventory', icon: 'pi pi-box', route: '/dashboard/restaurant/inventory' },
          { label: 'sidebar.suppliers', icon: 'pi pi-users', route: '/dashboard/restaurant/suppliers' },
          { label: 'sidebar.orders', icon: 'pi pi-truck', route: '/dashboard/restaurant/orders' },
          { label: 'sidebar.recipes', icon: 'pi pi-clipboard', route: '/dashboard/restaurant/recipes' },
          { label: 'sidebar.sales', icon: 'pi pi-chart-line', route: '/dashboard/restaurant/sales' }
        ];
      }
  
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile)
    this.checkMobile()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  watch: {
    isMobile(newValue) {
      this.sidebarVisible = !newValue
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path.startsWith(route)
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 1260
      this.sidebarVisible = !this.isMobile
    }
  }
}
</script>


<style>

/* Base sidebar para todos los tamaños */
.sidebar {
  /* width: 30rem; */
  background: var(--surface-0);
  border-right: 1px solid var(--surface-border);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
}

/* Desktop (por defecto visible) */
@media (min-width: 1260px) {
  .sidebar {
    position: relative;
    transform: translateX(0);
  }
}

@media (max-width: 1259px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 5;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  .sidebar--mobile-show {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }

  .sidebar--mobile-hide {
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
}

.hamburger-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 10;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}
/* Logo */
.logo-icon {
  width: 2.25rem;       /* ≈36 px, igual al mock-up */
  height: auto;
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;     /* semibold */
  font-size: 1.25rem;   /* ≈20 px */
}


</style>
